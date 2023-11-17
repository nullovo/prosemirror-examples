import { EditorView } from "prosemirror-view";

export interface Menu {
  command: any;
  dom: HTMLElement;
}

class MenuView {
  dom: HTMLElement;
  menus: Array<Menu>;
  editorView: EditorView;
  constructor(menus: Array<Menu>, editorView: EditorView) {
    this.menus = menus;
    this.editorView = editorView;

    this.dom = document.createElement("div");
    this.dom.className = ""; //menu bar className
    menus.forEach(({ dom }) => {
      dom.style.display = "";
      this.dom.appendChild(dom);
    });

    this.dom.addEventListener("mousedown", (e) => {
      e.preventDefault();
      editorView.focus();

      menus.forEach(({ command, dom }) => {
        if (dom.contains(e.target)) {
          command(editorView.state, editorView.dispatch, editorView);
        }
      });

      this.update();
    });
  }

  update() {
    this.menus.forEach(({ command, dom }) => {
      console.log("run");
      const active = command(this.editorView.state, null, this.editorView);
      dom.style.display = active ? "" : "none";
    });
  }

  destroy() {
    this.dom.remove();
  }
}

export default MenuView;
