import { PurchaseOrder } from './purchaseOrder.model';
export class PurchaseOrderList {
  public purchaseOrders: PurchaseOrder[];
    
  constructor (purchaseOrders: PurchaseOrder[]) {
    this.purchaseOrders = purchaseOrders;
    }
}
