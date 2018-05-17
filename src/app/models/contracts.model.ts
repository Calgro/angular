import { ContractsDetail } from './contractsDetail.model';
export class ContractsModel {
  public contracts: ContractsDetail[];

  constructor (contracts: ContractsDetail[]) {
    this.contracts = contracts;
  }
}
