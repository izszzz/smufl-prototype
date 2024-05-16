export {};
declare global {
  interface SVGElementOptions {
    type?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
  interface SVGSVGElement {
    createSVGElement: <K extends keyof SVGElementTagNameMap>(
      qualifiedName: K,
      options?: Record<string, unknown>
    ) => SVGElementTagNameMap[K];
  }
}
SVGSVGElement.prototype.createSVGElement = function (qualifiedName, options) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName
  );

  if (!options) return element;

  if (options.x || options.y)
    if (element instanceof SVGGElement) {
      const transform = this.createSVGTransform();
      transform.setTranslate(Number(options.x) ?? 0, Number(options.y) ?? 0);
      element.transform.baseVal.appendItem(transform);
    }

  for (const [k, v] of Object.entries(options)) {
    element.setAttribute(k, String(v));
  }

  return element;
};
