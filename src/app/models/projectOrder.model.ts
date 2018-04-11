import { Item } from './item.model';
import { Order } from './order.model';
export class ProjectOrder {
  public project: string;
  public orders: Order[];
  public materials: Item[];

  constructor (project: string, orders: Order[], materials: Item[]) {
    this.project = project;
    this.orders = orders;
    this.materials = materials;
    }
}
