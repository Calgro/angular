import { SupplierShort } from './supplierShort.model';
export class Suppliers {
  public suppliers: SupplierShort[];

  constructor (suppliers: SupplierShort[]) {
    this.suppliers = suppliers;
  }
}
