// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
//@ts-ignore
import { JSDOM } from "jsdom";

import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
	pretendToBeVisual: true,
});
// global.document = dom.window.document;
global.SVGGElement = dom.window.SVGSVGElement;
