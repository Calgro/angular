import { MaterialDetail } from './materialDetail.model';
export class Materials {
  public materials: MaterialDetail[];

  constructor (materials: MaterialDetail[]) {
    this.materials = materials;
  }
}
