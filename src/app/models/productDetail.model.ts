export class ProductDetail {
  public productID: string;
  public description: string;
  public group: string;
  public category: string;
  public departmentID: string;

  constructor (productID: string, description: string, group: string, category: string, departmentID: string) {
    this.productID = productID;
    this.description = description;
    this.group = group;
    this.category = category;
    this.departmentID = departmentID;
   }
}