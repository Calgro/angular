import { OrderTotal } from './orderTotal.model';
export class OrderDashboard {
  public internalOrderTotal: number;
  public externalOrderTotal: number;
  public internalOrderTotals: OrderTotal[];
  public externalOrderTotals: OrderTotal[];
  public qtyOrdered: number;
  public qtyDelivered: number;
  public qtyCheckedOut: number;
  
  constructor (
    internalOrderTotal: number,
    externalOrderTotal: number,
    internalOrderTotals: OrderTotal[],
    externalOrderTotals: OrderTotal[],
    qtyOrdered: number,
    qtyDelivered: number,
    qtyCheckedOut: number
  ) {
    this.internalOrderTotal = internalOrderTotal;
    this.externalOrderTotal = externalOrderTotal;
    this.internalOrderTotals = internalOrderTotals;
    this.externalOrderTotals = externalOrderTotals;
    this.qtyOrdered = qtyOrdered;
    this.qtyDelivered = qtyDelivered;
    this.qtyCheckedOut = qtyCheckedOut;
    }
}
