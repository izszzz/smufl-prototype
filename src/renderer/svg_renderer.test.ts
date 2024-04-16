import * as Core from "../models/core";
import SVGRenderer from "./svg_renderer";
test("test", () => {
	new SVGRenderer(document.body, new Core.Score({ tracks: [{ notes: [] }] }));
	expect(document.body.querySelector("svg")).toContainHTML(
		`<svg font-size="30" height="100%" width="100%">
			<g>
				<g type="row" y="75">
					<g type="barlines">
						<text type="barline" x="0" y="0"></text>
					</g>
					<g type="track" y="0">
						<g type="bar" x="0">
							<g type="metadata" y="-7.5">
								<text></text>
								<text x="20.130000000000003"></text>
								<text x="20.130000000000003" y="-15"></text>
							</g>
							<g type="notes" />
							<g type="staffs">
								<text type="staff" x="0"></text>
								<text type="staff" x="7.5"></text>
								<text type="staff" x="15"></text>
								<text type="staff" x="22.5"></text>
								<text type="staff" x="30"></text>
								<text type="staff" x="37.5"></text>
								<text type="staff" x="45"></text>
								<text type="staff" x="52.5"></text>
								<text type="staff" x="60"></text>
								<text type="staff" x="67.5"></text>
							</g>
						</g>
					</g>
				</g>
			</g>
		</svg>`.replace(/[\t\n]/g, ""),
	);
});
