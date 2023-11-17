import { Schema, NodeSpec } from "prosemirror-model";

const nodes = {
  doc: {
    content: "block+",
  },
  div: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "div" }],
    toDOM() {
      return ["div", 0];
    },
  },
  text: {
    group: "inline",
  } as NodeSpec,
};

export const schema = new Schema({ nodes } as any);
