export class BuildingShort {
  public buildingID: string;
  public name: string;
  public type: string;
  public typology: string;
  public blockName: string;

  constructor (buildingID: string, name: string, type: string, typology: string, blockName: string) {
    this.buildingID = buildingID;
    this.name = name;
    this.type = type;
    this.typology = typology;
    this.blockName = blockName;
  }
}