import { Schema } from "prosemirror-model";

export const noteSchema = new Schema({
  nodes: {
    text: {},
    note: {
      content: "text*",
      attrs: {
      },
      draggable: true,
      toDOM() {
        return [
          "div",
          {
            class:
              "text-xs border-sky-400 border rounded-md mb-2 p-2 cursor-grab",
          },
          0,
        ];
      },
      parseDOM: [{ tag: "div" }],
    },
    notegroup: {
      content: "note+",
      toDOM() {
        return ["notegroup", 0];
      },
      parseDOM: [{ tag: "notegroup" }],
    },
    doc: {
      content: "(note | notegroup)+",
    },
  },
});
