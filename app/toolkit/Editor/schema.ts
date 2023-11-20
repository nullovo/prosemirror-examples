import { NodeSpec, Schema } from "prosemirror-model";

const nodes = {
  doc: {
    content: "block+",
  },
  blockItem: {
    group: "block",
    content: "inline*",
    toDOM() {
      return ["div", 0];
    },
    parseDOM: [{ tag: "div" }],
  },
  heading: {
    attrs: { level: { default: 1 } },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
      { tag: "h4", attrs: { level: 4 } },
      { tag: "h5", attrs: { level: 5 } },
      { tag: "h6", attrs: { level: 6 } },
    ],
    toDOM(node) {
      return ["h" + node.attrs.level, 0];
    },
  } as NodeSpec,
  text: {
    group: "inline",
  },
};

const marks = {
  strong: {
    toDOM() {
      return ["strong", 0];
    },
    parseDOM: [{ tag: "strong" }],
  },
  em: {
    toDOM() {
      return ["em", 0];
    },
    parseDOM: [{ tag: "em" }],
  },
};

export const schema = new Schema({ nodes, marks } as any);
