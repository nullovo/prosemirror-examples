"use client";
import { useState, useRef, memo, useEffect } from "react";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap, splitBlock } from "prosemirror-commands";
import { useMount, useUnmount } from "ahooks";
import { starSchema, starKeymap } from "./starSchema";

const DocumentEditor = () => {
  const editRef = useRef<any>(null);
  const [editView, setEditView] = useState<EditorView>();

  const createEditView = () => {
    const state = EditorState.create({
      doc: starSchema.nodeFromJSON({
        type: "doc",
        content: [],
      }),
      schema: starSchema,
      plugins: [starKeymap],
    });
    const view = new EditorView(editRef.current, {
      state,
      attributes: {
        class:
          "focus:outline-none w-full px-2 py-2 border-sky-400 border rounded-md text-left min-h-[120px]",
      },
      editable: () => true,
    });
    return view;
  };

  useMount(() => {
    const view = createEditView();
    setEditView(view);
  });

  useUnmount(() => {
    editView?.destroy();
  });

  return <div ref={editRef} className="w-1/2" />;
};

export default memo(DocumentEditor);
