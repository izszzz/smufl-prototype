import SVGRect from "happy-dom/src/nodes/svg-element/SVGRect.ts";
import SVGPoint from "happy-dom/src/nodes/svg-element/SVGPoint.ts";
import "./src/extensions/buffer/to_array_buffer.extensions";
import "./src/extensions/svgsvgelement/create_svg_element.extensions";

global.SVGGElement = SVGGraphicsElement;
global.SVGRect = SVGRect;
global.SVGPoint = SVGPoint;
