import type { PriceList } from "./PriceList.js";
import type { Product } from "./Product.js";

export class ItemPriceList {
  product: Product;
  price: Number;
  priceList: PriceList;

  constructor(product: Product, price: Number, priceList: PriceList) {
    this.product = product;
    this.price = price;
    this.priceList = priceList;
  }

}

export interface ItemPriceListRequest{
  id: Number
  name: String
  price: Number
}
