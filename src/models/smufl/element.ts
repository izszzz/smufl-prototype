import { SMUFLCoord } from "./coord"
import { SMUFLStaff } from "./staff";

export abstract class SMUFLElement extends SMUFLCoord {
	width: number = 0
	height: number = 0
	spacing = new Spacing()
}
// TODO: Spacing Class widthが加算されるたびにstaffwidthに換算する
export class Spacing {
	_left: number=0;
	_right: number=0;
	get left (){
		return this._left
	}
	get right (){
		return this._right
	}

	set left(value: number){
		this._left += SMUFLStaff.getStaffGlyph(value, 1)?.width //TODO: dynamic lineCOunt
		console.log(this._left)
	}
	set right(value: number){
		this._right += SMUFLStaff.getStaffGlyph(value, 1)?.width;
	}
}