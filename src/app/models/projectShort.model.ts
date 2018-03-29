export class ProjectShort {
  public projectID: string;
  public projectName: string;
  public abbreviation: string;
  public state: string;

  constructor (projectID: string, projectName: string, abbreviation: string, state: string) {
    this.projectID = projectID;
    this.projectName = projectName;
    this.abbreviation = abbreviation;
    this.state = state;
  }
}