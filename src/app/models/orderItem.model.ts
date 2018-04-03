export class OrderItem {
  public materialID: string;
  public productID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantity: number;
  public deliveryAddressID: string;
  public departmentID: string;

  constructor (
      materialID: string,
      productID: string,
      buildingID: string,
      description: string,
      group: string,
      category: string,
      quantity: number,
      deliveryAddressID: string,
      departmentID: string) {
    this.materialID = materialID;
    this.productID = productID;
    this.buildingID = buildingID;
    this.description = description;
    this.group = group;
    this.category = category;
    this.quantity = quantity;
    this.deliveryAddressID = deliveryAddressID;
    this.departmentID = departmentID;
  }
}
