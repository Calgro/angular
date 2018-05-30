import { ContractsDetail } from './contractsDetail.model';
export class Contracts {
  public contracts: ContractsDetail[];

  constructor (contracts: ContractsDetail[]) {
    this.contracts = contracts;
  }
}
