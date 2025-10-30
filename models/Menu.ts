import type { ItemMenu } from "./ItemMenu.js";

export class Menu {
  id: Number;
  name: String;
  items: ItemMenu[];

  constructor(id: Number, name: String, items: ItemMenu[]) {
    this.id = id;
    this.name = name;
    this.items = items;
  }
}
