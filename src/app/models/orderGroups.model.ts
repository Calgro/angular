import { OrderGroupShort } from './orderGroupShort.model';
export class OrderGroups {
  public orderGroups: OrderGroupShort[];

  constructor (orderGroups: OrderGroupShort[]) {
    this.orderGroups = orderGroups;
  }
}
