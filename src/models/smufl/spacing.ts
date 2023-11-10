import { SMUFLStaff } from "./staff";

export class Spacing {
	_left: number=0;
	_right: number=0;
	get left (){ return this._left }
	get right (){ return this._right }

	set left(value: number){
		this._left += SMUFLStaff.getStaffGlyph(value)?.width
	}
	set right(value: number){
		this._right += SMUFLStaff.getStaffGlyph(value)?.width
	}
}