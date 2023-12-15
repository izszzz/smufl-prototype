interface ICoord {
	x: number;
	y: number;
}
export abstract class Coord implements ICoord {
	x;
	y;
	constructor(coord?: Partial<ICoord>) {
		this.x = coord?.x ?? 0;
		this.y = coord?.y ?? 0;
	}
}
