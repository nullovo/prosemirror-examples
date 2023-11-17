import { Plugin } from "prosemirror-state";
import { MenuViewWrapper } from "./MenuViewWrapper";
import { createRoot } from "react-dom/client";

export const menuPlugin = () => {
  const plugin = new Plugin({
    view(editorView) {
      const container = document.createElement("div");
      editorView.dom.parentNode?.insertBefore(container, editorView.dom);

      const root = createRoot(container);
      root.render(MenuViewWrapper({ editorView }));

      return {
        update(view) {
          root.render(MenuViewWrapper({ editorView: view }));
        },
        destroy() {
          container.remove();
        },
      };
    },
  });

  return plugin;
};
