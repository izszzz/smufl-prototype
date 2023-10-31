import { SMUFLGlyph } from "./glyph"

export class SMUFLGroup{
	glyphs: SMUFLGlyph[] = []
	get width(): number {
		return this.glyphs.reduce((acc, cur) => acc + cur.width, 0)
	}
}