export class PurchaseOrder {
  public PONumber: string;
  public BSPONumber: string;
  public supplier: string;
  public state: string;
   
  constructor (PONumber: string, BSPONumber: string, supplier: string, state: string) {
    this.PONumber = PONumber;
    this.BSPONumber = BSPONumber;
    this.supplier = supplier;
    this.state = state;
    }
}
