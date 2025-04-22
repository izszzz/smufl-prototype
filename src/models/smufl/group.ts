import * as R from "remeda";
import { Text } from "./text";

export class Group {
  children;
  index;
  y;
  x;

  get width(): number {
    return (
      R.firstBy(
        R.map(R.pipe(this.children, R.map(R.prop("index")), R.unique()), (v) =>
          R.pipe(
            this.children,
            R.filter((child) => child.index === v),
            R.reduce((acc, cur) => (acc += cur.width), 0)
          )
        ),
        [R.identity(), "desc"]
      ) ?? 0
    );
  }

  constructor({
    children,
    index,
    y,
    x,
  }: {
    children: (Text | Group)[];
    x?: number;
    y?: number;
    index?: number;
  }) {
    this.children = children;
    this.index = index ?? 0;
    this.y = y ?? 0;
    this.x = x ?? 0;
  }

  order() {
    R.map(R.pipe(this.children, R.map(R.prop("index")), R.unique()), (v) =>
      R.pipe(
        this.children,
        R.filter((child) => child.index === v),
        R.reduce(
          (prev, cur) => {
            if (prev) cur.x = prev.width + prev.x;
            if (cur instanceof Group) cur.order();
            return cur;
          },
          null as Group | Text | null
        )
      )
    );
  }
}
