export class DeliveryAddressDetail {
  public deliveryAddressID: string;
  public name: string;
  public address: string;
  
  constructor (deliveryAddressID: string, name: string, address: string) {
    this.deliveryAddressID = deliveryAddressID;
    this.name = name;
    this.address = address;
   }
}