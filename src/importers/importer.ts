import * as Core from "../models/core";
export interface Importer {
	import: () => Core.Score;
}
