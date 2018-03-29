import { DepartmentShort } from './departmentShort.model';
export class Departments {
  public departments: DepartmentShort[];

  constructor (departments: DepartmentShort[]) {
    this.departments = departments;
  }
}
