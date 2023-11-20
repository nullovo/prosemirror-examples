import { setBlockType, toggleMark } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { schema } from "./schema";

const menus = [
  { command: toggleMark(schema.marks.strong), dom: "B" },
  { command: toggleMark(schema.marks.em), dom: "i" },
  {
    command: setBlockType(schema.nodes.blockItem),
    dom: "p",
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 1 }),
    dom: "H1",
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 2 }),
    dom: "H2",
  },
  {
    command: setBlockType(schema.nodes.heading, { level: 3 }),
    dom: "H3",
  },
];

interface MenuViewWrapperProps {
  editorView: EditorView;
}

export const MenuView = (props: MenuViewWrapperProps) => {
  const { editorView } = props;

  return (
    <div className="flex border-b border-sky-400 border-solid">
      {menus.map(({ dom, command }, index) => {
        return (
          <span
            key={index}
            onClick={() => {
              command(editorView.state, editorView.dispatch, editorView);
            }}
            className="px-2 py-1 cursor-pointer border-r border-sky-400 border-solid"
            style={{
              display: command(editorView.state, undefined, editorView)
                ? "inline"
                : "none",
            }}
          >
            {dom}
          </span>
        );
      })}
    </div>
  );
};
