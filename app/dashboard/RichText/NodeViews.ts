import { Node } from "prosemirror-model";

export class PView {
  dom: HTMLDivElement;
  node: any;
  constructor(node: any) {
    this.dom = document.createElement("p");
    this.dom.textContent = node.textContent;
    this.dom.removeAttribute("contenteditable");
    this.node = node;
  }
  update(node: any) {
    // 在节点更新时更新节点视图
    if (node.textContent !== this.node.textContent) {
      this.dom.textContent = node.textContent;
    }
    return true; // 返回 true 表示节点视图已更新
  }
}

export class DivView {
  dom: HTMLDivElement;
  node: any;
  constructor(node: any) {
    this.node = node;
    this.dom = document.createElement("div");
    this.dom.textContent = node.textContent;
    this.dom.contentEditable = "true";
    console.log(this.dom);
    this.node = node;
  }

  update(node: any) {
    if (node.textContent !== this.node.textContent) {
      this.node.textContent = node.textContent;
      this.dom.textContent = node.textContent;
      return true;
    }
    return false;
  }
}

export class NoteView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  node: Node;
  constructor(node: Node) {
    this.node = node;
    this.dom = document.createElement("div");
    this.contentDOM = document.createElement("note");
    this.dom.appendChild(this.contentDOM);
    this.dom.className = "py-1 px-2 w-full text-xs";
  }
  update() {
    return true;
  }
  destroy() {
    // unmountComponentAtNode(this.dom);
  }
}
