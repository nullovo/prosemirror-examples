import { setBlockType, toggleMark, wrapIn } from "prosemirror-commands";
import { schema } from "./schema";

const icon = (text: string, name: string) => {
  const span = document.createElement("span");

  span.title = name;
  span.style.display = "inline";
  span.textContent = text;

  return span;
};

const heading = (level: number) => {
  return {
    command: setBlockType(schema.nodes.heading, { level }),
    dom: icon("H" + level, "heading"),
  };
};

export const menus = [
  { command: toggleMark(schema.marks.strong), dom: icon("B", "strong") },
  { command: toggleMark(schema.marks.em), dom: icon("i", "em") },
  {
    command: setBlockType(schema.nodes.blockItem),
    dom: icon("p", "paragraph"),
  },
  heading(1),
  heading(2),
  heading(3),
  //   { command: wrapIn(schema.nodes.blockquote), dom: icon(">", "blockquote") },
];
