"use client";

import { EditorState } from "prosemirror-state";
import { useRef, useState } from "react";
import { schema } from "./schema";
import { EditorView } from "prosemirror-view";
import { useMount, useUnmount } from "ahooks";
import { menuPlugin } from "./MenuPlugin";
import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";

const MenuEditor = () => {
  const editorRef = useRef<any>(null);
  const [editorView, setEditorView] = useState<EditorView>();

  const createEditorView = () => {
    const state = EditorState.create({
      schema,
      doc: schema.nodeFromJSON({
        type: "doc",
        content: [
          {
            type: "blockItem",
            content: [
              {
                type: "text",
                text: "简单的编辑器",
              },
            ],
          },
        ],
      }),
      plugins: [menuPlugin(), keymap(baseKeymap)],
    });

    const view = new EditorView(editorRef.current, {
      state,
      attributes: {
        class: "focus:outline-none min-h-[120px] px-2 py-2",
      },
      editable: () => true,
      dispatchTransaction(tr) {
        view.updateState(view.state.apply(tr));
      },
    });

    view.dispatch(view.state.tr);
    return view;
  };

  useMount(() => {
    if (!editorRef.current) return;
    const view = createEditorView();
    setEditorView(view);
  });

  useUnmount(() => {
    editorView?.destroy();
  });

  return (
    <div className={"w-1/2 border-sky-400 border rounded-md"}>
      <div ref={editorRef} className="text-left  w-full  text-xs" />
    </div>
  );
};

export default MenuEditor;
