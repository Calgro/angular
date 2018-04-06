import { DepartmentOrder } from './departmentOrder.model';
import { ProjectOrder } from './projectOrder.model';
export class OrderList {
  public projectOrders: ProjectOrder[];
  public departmentOrders: DepartmentOrder[];

  constructor (projectOrders: ProjectOrder[], departmentOrders: DepartmentOrder[]) {
    this.projectOrders = projectOrders;
    this.departmentOrders = departmentOrders;
    }
}
