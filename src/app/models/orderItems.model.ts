import { Item } from './item.model';
import { OrderItem } from './orderItem.model';
export class OrderItems {
  public mode: string;
  public orderItems: OrderItem[];
  public items: Item[];
  
  constructor (mode: string, orderItems: OrderItem[], items: Item[]) {
    this.mode = mode;
    this.orderItems = orderItems;
  }
}
