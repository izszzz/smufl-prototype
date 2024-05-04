import * as Core from "../models/core";
import { Importer } from "./importer";
export class CoreImporter implements Importer {
	import() {
		return new Core.Score({ tracks: [] });
	}
}
