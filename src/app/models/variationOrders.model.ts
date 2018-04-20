import { VariationOrdersShort } from './variationOrdersShort.model';
export class VariationOrders {
  public variationOrders: VariationOrdersShort[];

  constructor (variationOrders: VariationOrdersShort[]) {
    this.variationOrders = variationOrders;
  }
}
