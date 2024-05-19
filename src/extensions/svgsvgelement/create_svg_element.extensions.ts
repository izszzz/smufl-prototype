export {};
declare global {
  interface SVGSVGElement {
    createSVGElement: <K extends keyof SVGElementTagNameMap>(
      qualifiedName: K,
      options?: Record<string, unknown> & {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
      }
    ) => SVGElementTagNameMap[K];
  }
}
SVGSVGElement.prototype.createSVGElement = function (qualifiedName, options) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName
  );

  if (!options) return element;
  if (element instanceof SVGGElement) {
    const transform = this.createSVGTransform();
    transform.setTranslate(options?.x ?? 0, options?.y ?? 0);
    element.transform.baseVal.appendItem(transform);
  }

  for (const [k, v] of Object.entries(options))
    element.setAttribute(k, String(v));

  return element;
};
