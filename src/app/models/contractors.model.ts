import { ContractorShort } from './contractorShort.model';
export class Contractors {
  public contractors: ContractorShort[];

  constructor (contractors: ContractorShort[]) {
    this.contractors = contractors;
  }
}
