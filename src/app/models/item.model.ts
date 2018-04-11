import { ItemBreakdown } from './itemBreakdown.model';
export class Item {
  public materialID: string;
  public productID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantity: number;
  public quantityDelivered: number;
  public quantityCheckedOut: number;
  public deliveryAddress: string;
  public departmentID: string;
  public breakdown: ItemBreakdown[];
  public rate: number;
  public PONumber: string;

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
      breakdown: ItemBreakdown[],
      PONumber: string,
      quantityDelivered: number,
      quantityCheckedOut: number) {
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
    this.PONumber = PONumber;
    this.quantityDelivered = quantityDelivered;
    this.quantityCheckedOut = quantityCheckedOut;
  }
}
