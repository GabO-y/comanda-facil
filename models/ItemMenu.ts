import type { Menu } from "./Menu.js";
import type { Product } from "./Product.js";

export class ItemMenu {
  product: Product;
  menu: Menu;
  isAvailable: Boolean;
  quantity: Number;

  constructor(
    product: Product,
    menu: Menu,
    isAvailable: Boolean,
    quantity: Number
  ) {
    this.product = product;
    this.menu = menu;
    this.isAvailable = isAvailable;
    this.quantity = quantity;
  }
  
}
