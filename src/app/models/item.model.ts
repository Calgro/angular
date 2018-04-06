import { ItemBreakdown } from './itemBreakdown.model';
export class Item {
  public materialID: string;
  public productID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantity: number;
  public deliveryAddress: string;
  public departmentID: string;
  public breakdown: ItemBreakdown[];
  public rate: number;

  constructor (
      materialID: string,
      productID: string,
      buildingID: string,
      description: string,
      group: string,
      category: string,
      quantity: number,
      deliveryAddress: string,
      departmentID: string,
      rate: number,
      breakdown: ItemBreakdown[]) {
    this.materialID = materialID;
    this.productID = productID;
    this.buildingID = buildingID;
    this.description = description;
    this.group = group;
    this.category = category;
    this.quantity = quantity;
    this.deliveryAddress = deliveryAddress;
    this.departmentID = departmentID;
    this.rate = rate;
    this.breakdown = breakdown;
  }
}
