import type { ItemPriceList } from "./ItemPriceList.js";

export class PriceList {
  id: Number;
  name: String;
  inEffect: Boolean;
  beginDate: Date;
  endDate: Date;
  items: ItemPriceList[];

  constructor(
    id: Number,
    name: String,
    inEffect: Boolean,
    beginDate: Date,
    endDate: Date,
    items: ItemPriceList[]
  ) {
    this.id = id;
    this.name = name;
    this.inEffect = inEffect;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.items = items;
  }
}
