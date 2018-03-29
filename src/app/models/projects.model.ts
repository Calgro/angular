import { ProjectShort } from './projectShort.model';
export class Projects {
  public projects: ProjectShort[];

  constructor (projects: ProjectShort[]) {
    this.projects = projects;
  }
}
