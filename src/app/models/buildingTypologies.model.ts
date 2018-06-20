import { BuildingTypologiesShort } from './buildingTypologiesShort.model';
export class BuildingTypologies {
  public buildingTypologies: BuildingTypologiesShort[];

  constructor (buildingTypologies: BuildingTypologiesShort[]) {
    this.buildingTypologies = buildingTypologies;
  }
}
