export class OrderApprovalItem {
  public itemID: string;
  public outcome: boolean;
  public reason: string;
  public supplierID: string;

  constructor (itemID: string, outcome: boolean, reason: string, supplierID: string,) {
    this.itemID = itemID;
    this.outcome = outcome;
    this.reason = reason;
    this.supplierID = supplierID;
  }
}
