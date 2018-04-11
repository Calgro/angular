export class OrderTotal {
  public state: string;
  public total: number;

  constructor (state: string, total: number) {
    this.state = state;
    this.total = total;
    }
}
