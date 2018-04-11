export class ItemBreakdown {
  public itemID: string;
  public project: string;
  public township: string;
  public erf: string;
  public privateUseArea: string;
  public building: string;
  public department: string;
  public description: string;
  public group: string;
  public category: string;
  public quantity: number;
  public rate: number;
  public state: string;
  public contractAllocation: string;

  constructor (
      itemID: string,
      project: string,
      township: string,
      erf: string,
      building: string,
      department: string,
      description: string,
      group: string,
      category: string,
      quantity: number,
      rate: number,
      state: string,
      contractAllocation: string) {
    this.itemID = itemID;
    this.project = project;
    this.township = township;
    this.erf = erf;
    this.building = building;
    this.department = department;
    this.description = description;
    this.group = group;
    this.category = category;
    this.quantity = quantity;
    this.rate = rate;
    this.state = state;
    this.contractAllocation = contractAllocation;
   }
}
