import { OrderTotal } from './orderTotal.model';
export class OrderDashboard {
  public internalOrderTotal: number;
  public externalOrderTotal: number;
  public internalOrderTotals: OrderTotal[];
  public externalOrderTotals: OrderTotal[];

  constructor (
    internalOrderTotal: number,
    externalOrderTotal: number,
    internalOrderTotals: OrderTotal[],
    externalOrderTotals: OrderTotal[]) {
    this.internalOrderTotal = internalOrderTotal;
    this.externalOrderTotal = externalOrderTotal;
    this.internalOrderTotals = internalOrderTotals;
    this.externalOrderTotals = externalOrderTotals;
    }
}
