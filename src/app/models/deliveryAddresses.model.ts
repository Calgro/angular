import { DeliveryAddressDetail } from './deliveryAddressDetail.model';
export class DeliveryAddresses {
  public deliveryAddresses: DeliveryAddressDetail[];

  constructor (deliveryAddresses: DeliveryAddressDetail[]) {
    this.deliveryAddresses = deliveryAddresses;
  }
}
