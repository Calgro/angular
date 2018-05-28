export class MaterialDetail {
  public materialID: string;
  public buildingID: string;
  public description: string;
  public group: string;
  public category: string;
  public quantityAllowed: number;
  public quantityRemaining: number;
  public rate: number;
  public type: string;
  public unit: number;

  constructor (materialID: string, buildingID: string, description: string, group: string, category: string, quantityAllowed: number, quantityRemaining: number, rate: number, type: string, unit: number) {
    this.materialID = materialID;
    this.buildingID = buildingID;
    this.description = description;
    this.group = group;
    this.category = category;
    this.quantityAllowed = quantityAllowed;
    this.quantityRemaining = quantityRemaining;
    this.rate = rate;
    this.type = type;
    this.unit = unit;
   }
}
