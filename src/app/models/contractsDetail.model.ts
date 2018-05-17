export class ContractsDetail {
  public contractID: string;
  public financeID: string;
  public type: string;

  constructor (contractID: string, financeID: string, type: string) {
    this.contractID = contractID;
    this.financeID = financeID;
    this.type = type;
   }
}
