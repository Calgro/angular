export class DepartmentShort {
  public departmentID: string;
  public name: string;
  public lineManagerID: string;
  
  constructor (departmentID: string, name: string, lineManagerID: string) {
    this.departmentID = departmentID;
    this.name = name;
    this.lineManagerID = lineManagerID;
   }
}