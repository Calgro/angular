import { UserShort } from './userShort.model';
export class Users {
  public users: UserShort[];

  constructor (users: UserShort[]) {
    this.users = users;
  }
}
