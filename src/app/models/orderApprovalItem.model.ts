export class OrderApprovalItem {
  public itemID: string;
  public outcome: string;
  public reason: string;
  public supplierID: string;

  constructor (itemID: string, outcome: string, reason: string, supplierID: string,) {
    this.itemID = itemID;
    this.outcome = outcome;
    this.reason = reason;
    this.supplierID = supplierID;
  }
}
