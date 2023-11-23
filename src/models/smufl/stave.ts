import * as R from 'remeda';
import * as  SMUFL from "./";

interface BarStaff{
	x: number;
	staffs: SMUFL.Staff[]
	width: number;
}
interface TrackStaff{
	barStaffs: BarStaff[]
}

export class Stave{
	trackStaffRows: TrackStaff[][];
	clientWidth: number 
	type: "Pagination" | "VerticalScroll" | "HorizontalScroll"

	constructor(tracks: SMUFL.Track[], clientWidth: number, type: Stave["type"]) {
		this.type = type
		this.clientWidth = clientWidth
		this.trackStaffRows = this.#layout(this.#generate(this.#ajustSpacing(tracks)))
	}
	#generate(tracks: SMUFL.Track[]): TrackStaff[]{
		const generateTrackStaff = (track: SMUFL.Track): TrackStaff => ({ barStaffs: track.bars.map((bar) => generateBarStaff(bar, track.staffLineCount)) })
		const generateBarStaff = (bar: SMUFL.Bar, lineCount: SMUFL.Track["staffLineCount"]): BarStaff => {
			const barStaffs = bar.glyphs.map(glyph => new SMUFL.Staff(glyph.staffWidth, lineCount, glyph))
			const noteStaffs =  bar.notes.reduce<SMUFL.Staff[]>((acc, cur) => {
				acc.push(...R.times(cur.spacing.left, ()=> new SMUFL.Staff(1, lineCount)))
				// TODO: linecountを指定しなくてもいいようにする
				// TODO: staffWidthを指定しない場合はglyphのwidthから計算するようにする
				if(R.isDefined(cur.accidental)) acc.push(new SMUFL.Staff(cur.accidental.staffWidth, lineCount, cur.accidental))
				acc.push(new SMUFL.Staff(cur.glyph.staffWidth, lineCount, cur.glyph))
				acc.push(...R.times(cur.spacing.right, ()=> new SMUFL.Staff(1, lineCount)))
				return acc
			}, [])
			const staffs = [...barStaffs, ...noteStaffs]
			return {
				staffs, 
				x:0,
				width: staffs.reduce((acc, cur)=>acc + cur.width, 0)
			}
		}
		return tracks.map((track)=> generateTrackStaff(track))
	}
	// TODO: TrackStaff[]からスペースを調節するようにする clientWidthを参考にしてx軸をスペースでできる限り埋める
	#ajustSpacing(tracks: SMUFL.Track[]): SMUFL.Track[]{
		const verticalNotesCollection = tracks[0].bars.map((_, barIndex)=>tracks.map(track=>track.bars[barIndex])).map((verticalBars)=>
			verticalBars[0].notes.map((_, noteIndex)=>
				verticalBars.map(verticalBar=>
					verticalBar.notes[noteIndex]
				)
			)
		)
		verticalNotesCollection.forEach(verticalBars=>{
			verticalBars.forEach((verticalNotes)=>{
				const maxWidthVerticalNote = R.pipe(verticalNotes, R.sortBy(note=>note.glyph.staffWidth), R.last())
				if(maxWidthVerticalNote) verticalNotes.forEach(note => {
					if(note.glyph.staffWidth!== maxWidthVerticalNote.glyph.staffWidth) note.spacing.right = maxWidthVerticalNote.glyph.staffWidth - note.glyph.staffWidth
				})
				if(verticalNotes.some(note=>R.isDefined(note.accidental))) verticalNotes.forEach(note=> { if(R.isNil(note.accidental)) note.spacing.left = 1 })
			})
		})
		
		return tracks
	}
	#layout(trackStaffs: TrackStaff[]): TrackStaff[][]{
		const layoutNewLine = (trackStaffs: TrackStaff[]): TrackStaff[][] => 
			trackStaffs[0].barStaffs.reduce<{rows: TrackStaff[][], width: number, start: number}>((acc, cur, i)=>{
				acc.width += cur.width
				if(acc.width > this.clientWidth){
					acc.width = cur.width
					acc.rows.push(trackStaffs.map(({barStaffs})=> {
						let slicedBarStaffs = barStaffs.slice(acc.start, i)
						return {barStaffs: slicedBarStaffs}
					}))
					acc.start = i
				}
				if(i === trackStaffs[0].barStaffs.length-1 && acc.width < this.clientWidth)
					acc.rows.push(trackStaffs.map(({barStaffs})=>({barStaffs: barStaffs.slice(acc.start)})))
				return acc
			}, {rows: [], width: 0, start: 0}).rows
		const layoutTrackStaffs = (trackStaffs: TrackStaff[]): TrackStaff[] => {
			const reduceStaffs = <CurrentValue extends SMUFL.Staff | BarStaff>(acc: {staffs: CurrentValue[], prev:  CurrentValue | null}, cur: CurrentValue) => {
				if(acc.prev) cur.x =  acc.prev.x + acc.prev.width
				acc.prev = cur
				acc.staffs.push(cur)
				return acc
			}
			const layoutStaffs = (staffs: SMUFL.Staff[]): SMUFL.Staff[] => staffs.reduce<{staffs: SMUFL.Staff[], prev: SMUFL.Staff | null}>(reduceStaffs, {staffs: [], prev: null}).staffs
			const layoutBarStaffs = (barStaffs: BarStaff[]) => barStaffs.reduce<{staffs: BarStaff[], prev: BarStaff | null}>((acc, cur) => reduceStaffs(acc, {...cur, staffs: layoutStaffs(cur.staffs)}), {staffs: [], prev: null}).staffs
			return  trackStaffs.map(trackStaff => ({ barStaffs: layoutBarStaffs(trackStaff.barStaffs) }))
		}
		
		if(this.type === "HorizontalScroll") return [layoutTrackStaffs(trackStaffs)]
		if(this.type === "VerticalScroll") return layoutNewLine(trackStaffs).map(trackStaffs => layoutTrackStaffs(trackStaffs))
		if(this.type === "Pagination")  return []
		return []
	}
}