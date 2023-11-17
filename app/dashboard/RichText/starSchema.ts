import { toggleMark } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

export const starSchema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    paragraph: {
      group: "block",
      content: "inline*",
      toDOM() {
        return ["p", { class: "text-xs" }, 0];
      },
      parseDOM: [{ tag: "p" }],
    },
    boring_paragraph: {
      group: "block",
      content: "text*",
      marks: "",
      toDOM() {
        return ["p", { class: "boring" }, 0];
      },
      parseDOM: [{ tag: "p.boring", priority: 60 }],
    },
    star: {
      inline: true,
      group: "inline",
      toDOM() {
        return ["star", "✨"];
      },
      parseDOM: [{ tag: "star" }],
    },
    text: {
      group: "inline",
    },
  },
  marks: {
    shouting: {
      toDOM() {
        return ["b", 0];
      },
      parseDOM: [{ tag: "b" }],
    },
    link: {
      attrs: { href: {} },
      toDOM(node) {
        return ["a", { href: node.attrs.href, class: "text-cyan-500" }, 0];
      },
      parseDOM: [
        {
          tag: "a",
          getAttrs(dom: any) {
            return { href: dom.href };
          },
        },
      ],
      inclusive: false,
    },
  },
});

const toggleLink = (state: EditorState, dispatch: any) => {
  let { doc, selection } = state;
  if (selection.empty) return false;

  let attrs = null;

  if (!doc.rangeHasMark(selection.from, selection.to, starSchema.marks.link)) {
    attrs = { href: prompt("Link to where?", "") };
    if (!attrs.href) return false;
  }
  return toggleMark(starSchema.marks.link, attrs)(state, dispatch);
};

const toggleShouting = (state: EditorState, dispatch: any) => {
  let { doc, selection } = state;
  if (selection.empty) return false;

  if (
    !doc.rangeHasMark(selection.from, selection.to, starSchema.marks.shouting)
  ) {
    const tr = state.tr.addMark(
      selection.from,
      selection.to,
      starSchema.marks.shouting.create()
    );
    dispatch(tr);
    return true;
  }
  const tr = state.tr.removeMark(
    selection.from,
    selection.to,
    starSchema.marks.shouting
  );
  dispatch(tr);
  return true;
};

const insertStar = (state: EditorState, dispatch: any) => {
  const type = starSchema.nodes.star;
  let { $from: from } = state.selection;
  if (!from.parent.canReplaceWith(from.index(), from.index(), type))
    return false;
  dispatch(state.tr.replaceSelectionWith(type.create()));
  return true;
};

export const starKeymap = keymap({
  "Ctrl-b": toggleShouting,
  "Ctrl-l": toggleLink,
  "Ctrl-d": insertStar,
});
