import * as  SMUFL from "./";
import * as  R from "remeda";

export class Row {
	 prev?: Row
	 tracks: SMUFL.Track[]
	 barlines: SMUFL.Barline[]
	 staffs: SMUFL.Staff[][][]
		// TODO: 
		//  y: number;
		//  height: number;
	 constructor(tracks: Row["tracks"], prev?: Row["prev"]){
		this.prev = prev
		this.tracks = tracks.map(track=>{
			const firstBar = R.first(track.bars)
			firstBar?.glyphs.push(firstBar.metadata.clef)
			if(R.isNil(this.prev))firstBar?.glyphs.push(firstBar.metadata.timeSig)
			return track
		})
		console.log(tracks, this.tracks)
		this.staffs = this.generateStaffs(this.tracks)
		this.barlines = this.generateBarlines(this.tracks)
	 }
	 generateStaffs(tracks: SMUFL.Track[]){
		const generateSpaceStaffs = (space: number, lineCount: ConstructorParameters<typeof SMUFL.Staff>[1]) => R.times(space, ()=> new SMUFL.Staff(1, lineCount))
		const generateBarlineEnd = (bar: SMUFL.Bar, staffLineCount: SMUFL.Track["staffLineCount"]) => R.isDefined(bar.barline.end) ? new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.end, "end") : new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.start, "end")
		// TODO: insertSpaceRow
		// TODO: insertBarline
		return tracks.flatMap(({bars, staffLineCount}) => [
			bars.map((bar) => R.compact([
				// new SMUFL.Staff(bar.barline.start.staffWidth, staffLineCount, bar.barline.start),
				...bar.glyphs.map(glyph => new SMUFL.Staff(glyph.staffWidth, staffLineCount, glyph)),
				...bar.notes.flatMap(note=>[
					...generateSpaceStaffs(note.spacing.left, staffLineCount),
					R.isDefined(note.accidental) ? new SMUFL.Staff(note.accidental.staffWidth, staffLineCount, note.accidental) : null,
					new SMUFL.Staff(note.glyph.staffWidth, staffLineCount, note.glyph),
					...generateSpaceStaffs(note.spacing.right, staffLineCount)
				]),
				// i === bars.length -1  ? generateBarlineEnd(bar, staffLineCount) : null
			])),
			[], // this is space row
			[], // this is space row
		])
	 }
	 // TODO: barlineとbarの長さがあわない
	 generateBarlines(tracks: SMUFL.Track[]){
		const firstTrack = R.first(tracks)
		if(R.isNil(firstTrack)) throw new Error()
		console.log(firstTrack.bars[0])
		return firstTrack.bars.map((_, i)=> {
			const barline = new SMUFL.Barline("barlineSingle")
			barline.glyph.x = firstTrack.bars.slice(0, i).reduce((acc, cur) => acc + cur.width, 0)
			return barline
		})
	 }
}