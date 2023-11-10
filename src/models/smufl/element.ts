import { SMUFLCoord } from "./coord"
import { SMUFLStaff } from "./staff"

export abstract class SMUFLElement extends SMUFLCoord {
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
		return SMUFLStaff.getStaffGlyph(this.width, 5).width // TODO: 定数
	}
}