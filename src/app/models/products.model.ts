import { ProductDetail } from './productDetail.model';
export class Products {
  public products: ProductDetail[];

  constructor (products: ProductDetail[]) {
    this.products = products;
  }
}
