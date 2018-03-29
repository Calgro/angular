import { BuildingShort } from './buildingShort.model';
export class Buildings {
  public buildings: BuildingShort[];

  constructor (buildings: BuildingShort[]) {
    this.buildings = buildings;
  }
}
