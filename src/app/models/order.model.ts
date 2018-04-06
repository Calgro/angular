import { OrderItem } from './orderItem.model';
import { Item } from './item.model';
export class Order {
  public orderID: string;
  public PONumber: string;
  public deliveryAddress: string;
  public supplier: string;
  public state: string;
  public items: Item[];
  
  constructor (orderID: string, PONumber: string, deliveryAddress: string, supplier: string, state: string, items: Item[]) {
    this.orderID = orderID;
    this.PONumber = PONumber;
    this.deliveryAddress = deliveryAddress;
    this.supplier = supplier;
    this.items = items;
    }
}
