import * as SMUFL from "../smufl";

export abstract class Element extends SMUFL.Coord {
	width: number = 0
	height: number = 0
	get staffWidth(): number{
		return SMUFL.Staff.getStaffGlyph(this.width).width
	}
}