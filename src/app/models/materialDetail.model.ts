export class MaterialDetail {
  public materialID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantityAllowed: number;
  public quantityRemaining: number;
  public rate: number;
  
  constructor (materialID: string, buildingID: string, description: string, group: string, category: string, quantityAllowed: number, quantityRemaining: number, rate: number) {
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