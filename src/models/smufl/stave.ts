import * as R from 'remeda';
import { SMUFLStaff } from "./staff";
import { SMUFLTrack } from "./track";
import { SMUFLBar } from './bar';

interface BarStaff{
	x: number;
	staffs: SMUFLStaff[]
	width: number;
}
interface TrackStaff{
	barStaffs: BarStaff[]
}

export class SMUFLStave{
	trackStaffRows: TrackStaff[][];
	clientWidth: number 
	type: "Pagination" | "VerticalScroll" | "HorizontalScroll"

	constructor(tracks: SMUFLTrack[], clientWidth: number, type: SMUFLStave["type"]) {
		this.type = type
		this.clientWidth = clientWidth
		this.trackStaffRows = this.#layout(this.#generate(this.#ajustSpacing(tracks)))
	}
	#generate(tracks: SMUFLTrack[]): TrackStaff[]{
		const generateTrackStaff = (track: SMUFLTrack): TrackStaff => ({ barStaffs: track.bars.map((bar) => generateBarStaff(bar, track.staffLineCount)) })
		const generateBarStaff = (bar: SMUFLBar, lineCount: SMUFLTrack["staffLineCount"]): BarStaff => {
			const barStaffs = bar.glyphs.map(glyph => new SMUFLStaff(glyph.staffWidth, lineCount, glyph))
			const noteStaffs =  bar.notes.reduce<SMUFLStaff[]>((acc, cur) => {
				acc.push(...R.times(cur.spacing.left, ()=> new SMUFLStaff(1, lineCount)))
				if(R.isDefined(cur.accidental)) acc.push(new SMUFLStaff(cur.accidental.staffWidth, lineCount, cur.accidental))
				acc.push(new SMUFLStaff(cur.glyph.staffWidth, lineCount, cur.glyph))
				acc.push(...R.times(cur.spacing.right, ()=> new SMUFLStaff(1, lineCount)))
				return acc
			}, [])
			const staffs = [new SMUFLStaff(bar.barline.start.staffWidth, lineCount, bar.barline.start), ...barStaffs, ...noteStaffs]
			if(bar.barline.end) staffs.push(new SMUFLStaff(bar.barline.end.staffWidth, lineCount, bar.barline.end))

			return {
				staffs, 
				x:0,
				width: staffs.reduce((acc, cur)=>acc + cur.width, 0)
			}
		}
		return tracks.map((track)=> generateTrackStaff(track))
	}
	// TODO: TrackStaff[]からスペースを調節するようにする clientWidthを参考にしてx軸をスペースでできる限り埋める
	#ajustSpacing(tracks: SMUFLTrack[]): SMUFLTrack[]{
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
					acc.width = 0
					acc.rows.push(trackStaffs.map(({barStaffs})=>({barStaffs: barStaffs.slice(acc.start, i)})))
					acc.start = i
				}
				if(i === trackStaffs[0].barStaffs.length-1 && acc.width < this.clientWidth)
					acc.rows.push(trackStaffs.map(({barStaffs})=>({barStaffs: barStaffs.slice(acc.start)})))
				return acc
			}, {rows: [], width: 0, start: 0}).rows
		const layoutTrackStaffs = (trackStaffs: TrackStaff[]): TrackStaff[] => {
			const reduceStaffs = <CurrentValue extends SMUFLStaff | BarStaff>(acc: {staffs: CurrentValue[], prev:  CurrentValue | null}, cur: CurrentValue) => {
				if(acc.prev) cur.x =  acc.prev.x + acc.prev.width
				acc.prev = cur
				acc.staffs.push(cur)
				return acc
			}
			const layoutStaffs = (staffs: SMUFLStaff[]): SMUFLStaff[] => staffs.reduce<{staffs: SMUFLStaff[], prev: SMUFLStaff | null}>(reduceStaffs, {staffs: [], prev: null}).staffs
			const layoutBarStaffs = (barStaffs: BarStaff[]) => 
				barStaffs.reduce<{staffs: BarStaff[], prev: BarStaff | null}>((acc, cur) => {
					layoutStaffs(cur.staffs)
					return reduceStaffs(acc, cur)
				}, {staffs: [], prev: null}).staffs
				return  trackStaffs.map(trackStaff => ({ barStaffs: layoutBarStaffs(trackStaff.barStaffs) })
			)
		}
		if(this.type === "HorizontalScroll") return [layoutTrackStaffs(trackStaffs)]
		if(this.type === "VerticalScroll") return layoutNewLine(trackStaffs).map(trackStaffs => layoutTrackStaffs(trackStaffs))
		if(this.type === "Pagination")  return []
		return []
	}
}