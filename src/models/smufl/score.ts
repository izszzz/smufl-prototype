import * as R from 'remeda';
import *  as SMUFL from "./"
import * as Core from "../core"


export class Score {
	type: "Pagination" | "VerticalScroll" | "HorizontalScroll"
	clientWidth: number
	tracks: SMUFL.Track[]
	rows: SMUFL.Row[];
	staffs: SMUFL.Staff[][][][]
	constructor({tracks}: Core.Score, clientWidth: number, type: Score["type"]){
		this.type = type
		this.clientWidth = clientWidth
		this.tracks = tracks.map(track => new SMUFL.Track(track))
		this.rows = this.layout(this.tracks)
		this.staffs = this.generate(this.rows)
	}
	layout(tracks: typeof this.tracks): SMUFL.Row[]{
		const ajustSpacing = (tracks: SMUFL.Track[]): SMUFL.Track[]=>{
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
		const layoutNewLine = (tracks: typeof this.tracks): SMUFL.Row[] =>{
			const generateRow = (tracks: typeof this.tracks, start: number, end?: number, prev?: SMUFL.Row["prev"]) => new SMUFL.Row(tracks.map((track)=> ({...track, bars: track.bars.slice(start, end)})), prev)
			const firstTrack = R.first(tracks)
			if(R.isNil(firstTrack)) throw new Error()
			return firstTrack.bars.reduce<{rows: SMUFL.Row[], width: number, start: number, prev?: SMUFL.Row | undefined}>((acc, cur, i)=>{
				acc.width += cur.width
				if(acc.width > this.clientWidth){
					const row = generateRow(tracks, acc.start, i, acc.prev)
					acc.width = cur.width
					acc.rows.push(row)
					acc.prev = row
					acc.start = i
				}
				if(i === firstTrack.bars.length-1 && acc.width < this.clientWidth){
					const row = generateRow(tracks, acc.start, undefined, acc.prev)
					acc.rows.push(row)
					acc.prev = row
				}
				return acc
			}, {rows: [], width:0, start: 0, prev: undefined}).rows
		}
		const spacingTracks = ajustSpacing(tracks)
		if(this.type === "HorizontalScroll") return [new SMUFL.Row(spacingTracks)]
		if(this.type === "VerticalScroll") return layoutNewLine(spacingTracks)
		if(this.type === "Pagination")  return []
		return []
	}
	generate(rows: SMUFL.Row[]){
		const generateSpaceStaffs = (space: number, lineCount: ConstructorParameters<typeof SMUFL.Staff>[1]) => R.times(space, ()=> new SMUFL.Staff(1, lineCount))
		const generateBarlineEnd = (bar: SMUFL.Bar, staffLineCount: SMUFL.Track["staffLineCount"]) => R.isDefined(bar.barline.end) ? new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.end, "end") : new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.start, "end")
		return rows.map(({tracks})=> 
			tracks.map(({bars, staffLineCount})=> 
				bars.map((bar, i) =>R.compact([
					new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.start),
					...bar.glyphs.map(glyph => new SMUFL.Staff(glyph.staffWidth, staffLineCount, glyph)),
					...R.pipe(
						bar.notes,
						R.flatMap(note=>[
							...generateSpaceStaffs(note.spacing.left, staffLineCount),
							R.isDefined(note.accidental) ? new SMUFL.Staff(note.accidental.staffWidth, staffLineCount, note.accidental) : null,
							new SMUFL.Staff(note.glyph.staffWidth, staffLineCount, note.glyph),
							...generateSpaceStaffs(note.spacing.right, staffLineCount)
						]),
						R.compact
					),
					i === bars.length -1  ? generateBarlineEnd(bar, staffLineCount) : null
				]))
			)
		)
		
	}
}