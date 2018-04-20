export class VariationOrdersShort {
  public requestID: string;
  public building: string;
  public material: string;
  public quantity: number;
  public state: string;

  constructor (requestID: string, building: string, material: string, quantity: number, state: string) {
    this.requestID = requestID;
    this.building = building;
    this.material = material;
    this.quantity = quantity;
    this.state = state;
  }
}
