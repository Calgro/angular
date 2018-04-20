import { OrderApprovalItem } from './orderApprovalItem.model';
export class ProcessOrder {
  public mode: string;
  public orderApprovalItems: OrderApprovalItem[];

  constructor (mode: string, orderApprovalItems: OrderApprovalItem[]) {
    this.mode = mode;
    this.orderApprovalItems = orderApprovalItems;
    }
}
