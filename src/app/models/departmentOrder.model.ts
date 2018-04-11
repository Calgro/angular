import { Order } from './order.model';
export class DepartmentOrder {
  public department: string;
  public orders: Order[];

  constructor (department: string, orders: Order[]) {
    this.department = department;
    this.orders = orders;
    }
}
