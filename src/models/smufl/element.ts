import * as SMUFL from "../smufl";

export abstract class Element extends SMUFL.Coord {
	_width: number = 0
	_height: number = 0
	get width(){
		return this._width
	}
	set width(value){
		this._width = value
	}
	get height(){
		return this._height
	}
	set height(value){
		this._height = value
	}
	get staffWidth(): number{
		return SMUFL.Staff.getStaffGlyph(this.width).width
	}
}