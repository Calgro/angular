import { OrderItem } from './orderItem.model';
export class OrderItems {
  public mode: string;
  public orderItems: OrderItem[];

  constructor (mode: string, orderItems: OrderItem[]) {
    this.mode = mode;
    this.orderItems = orderItems;
  }
}
