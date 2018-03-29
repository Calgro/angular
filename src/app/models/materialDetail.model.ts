export class MaterialDetail {
  public materialID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantityAllowed: string;
  public quantityRemaining: string;
  public rate: string;
  
  constructor (materialID: string, buildingID: string, description: string, group: string, category: string, quantityAllowed: string, quantityRemaining: string, rate: string) {
    this.materialID = materialID;
    this.buildingID = buildingID;
    this.description = description;
    this.group = group;
    this.category = category;
    this.quantityAllowed = quantityAllowed;
    this.quantityRemaining = quantityRemaining;
    this.rate = rate;
   }
}