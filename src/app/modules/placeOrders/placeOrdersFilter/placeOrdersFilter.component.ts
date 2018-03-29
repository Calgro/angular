import { Component, OnInit } from '@angular/core';
import { Projects } from '../../../models/projects.model';
import { ProjectShort } from '../../../models/projectShort.model';
import { Townships } from '../../../models/townships.model';
import { TownshipShort } from '../../../models/townshipShort.model';
import { Erven } from '../../../models/erven.model';
import { ErfShort } from '../../../models/erfShort.model';
import { PrivateUseAreas } from '../../../models/privateUseAreas.model';
import { PrivateUseAreaShort } from '../../../models/privateUseAreaShort.model';
import { Buildings } from '../../../models/buildings.model';
import { BuildingShort } from '../../../models/buildingShort.model';
import { ProjectsService } from '../../../services/projects.service';
import { TownshipsService } from '../../../services/townships.service';
import { Zonings } from '../../../models/zonings.model';
import { ZoningShort } from '../../../models/zoningShort.model';
import { Contractors } from '../../../models/contractors.model';
import { ContractorShort } from '../../../models/contractorShort.model';
import { DepartmentShort } from '../../../models/departmentShort.model';
import { Departments } from '../../../models/departments.model';
import { Materials } from '../../../models/materials.model';
import { MaterialDetail } from '../../../models/materialDetail.model';
import { ErvenService } from '../../../services/erven.service';
import { PuaService } from '../../../services/pua.service';
import { BuildingsService } from '../../../services/buildings.service';
import { TownplanningService } from '../../../services/townplanning.service';
import { ContractorsService } from '../../../services/contractors.service';
import { DepartmentsService } from '../../../services/departments.service';
import { FilterService } from '../../../services/filter.service';
import { MaterialsService } from '../../../services/materials.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-placeordersfilter',
  templateUrl: './placeOrdersFilter.component.html',
  styleUrls: ['./placeOrdersFilter.component.css']
})
export class PlaceOrdersFilterComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private townshipsService: TownshipsService,
    private ervenService: ErvenService,
    private puaService: PuaService,
    private buildingsService: BuildingsService,
    private townplanningService: TownplanningService,
    private materialsService: MaterialsService,
    private contractorsService: ContractorsService,
    private departmentsService: DepartmentsService,
    private filterService: FilterService,
    private router: Router) { }

  defaultDepartment: DepartmentShort = new DepartmentShort(null, 'Loading Departments', null);
  departments: Departments = new Departments([this.defaultDepartment]);

  defaultMaterial: MaterialDetail = new MaterialDetail('', 'Select a Building First', null, null, null, null, null, null);
  materials: Materials = new Materials([this.defaultMaterial]);

  defaultContractor: ContractorShort = new ContractorShort('', 'Loading Contractors');
  contractors: Contractors = new Contractors([this.defaultContractor]);

  defaultZoning: ZoningShort = new ZoningShort('', 'Select a Township First');
  zonings: Zonings = new Zonings([this.defaultZoning]);

  defaultBuilding: BuildingShort = new BuildingShort('', 'Select an Erf or PUA First', '', '', '');
  buildings: Buildings = new Buildings([this.defaultBuilding]);

  defaultPUA: PrivateUseAreaShort = new PrivateUseAreaShort('', 'Select an Erf First');
  privateUseAreas: PrivateUseAreas = new PrivateUseAreas([this.defaultPUA]);

  defaultErf: ErfShort = new ErfShort('', 'Select a Township First', '');
  erven: Erven = new Erven([this.defaultErf]);

  defaultTownship: TownshipShort = new TownshipShort('', 'Select a Project First');
  townships: Townships = new Townships([this.defaultTownship]);

  defaultProject: ProjectShort = new ProjectShort('', 'Loading Projects', '', '');
  projects: Projects = new Projects([this.defaultProject]);

  projectID = this.filterService.projectID;
  townshipID = this.filterService.townshipID;
  erfID = this.filterService.erfID;
  PUAID = this.filterService.PUAID;
  buildingID = this.filterService.buildingID;
  materialListType = this.filterService.materialListType;
  materialID = this.filterService.materialID;
  departmentID = this.filterService.departmentID;
  contractorID = this.filterService.contractorID;
  zoningID = this.filterService.zoningID;

  buildingMode = true;
    ngOnInit() {
      this.projectsService.projectListChanged.subscribe(
        (projects: Projects) => {
          this.projects = projects;
          }
      );

      this.projectsService.fetchProjects();

      this.departmentsService.departmentListChanged.subscribe(
        (departments: Departments) => {
          this.departments = departments;
          }
      );

      this.departmentsService.fetchDepartments();

      this.townshipsService.townshipListChanged.subscribe(
        (townships: Townships) => {
          this.townships = townships;
          }
      );
      if (this.projectID !== null) {
        this.townshipsService.fetchTownships(this.projectID);
        console.log('townshipID: ' + this.townshipID);
      }

      this.ervenService.erfListChanged.subscribe(
        (erven: Erven) => {
          this.erven = erven;
          }
      );


      this.puaService.puaListChanged.subscribe(
        (privateUseAreas: PrivateUseAreas) => {
          this.privateUseAreas = privateUseAreas;
          }
      );

      this.buildingsService.buildingListChanged.subscribe(
        (buildings: Buildings) => {
          this.buildings = buildings;
          }
      );

      this.townplanningService.zoningListChanged.subscribe(
        (zonings: Zonings) => {
          this.zonings = zonings;
          }
      );

      this.contractorsService.contractorListChanged.subscribe(
        (contractors: Contractors) => {
          this.contractors = contractors;
          }
      );
      this.contractorsService.fetchContractors(null, null, null, null, null);

      this.materialsService.materialListChanged.subscribe(
        (materials: Materials) => {
          this.materials = materials;
          }
      );
    }

    updateTownships(projectID) {
      this.townshipsService.fetchTownships(projectID);
      this.erven = new Erven([this.defaultErf]);
      this.contractorsService.fetchContractors(projectID, null, null, null, null);
    }
    townshipChange(townshipID) {
      this.updateErven(townshipID);
      this.updateZoning(townshipID);
      this.contractorsService.fetchContractors(null, townshipID, null, null, null);
      this.townshipsService.setTownship(townshipID);
    }
    updateErven(townshipID) {
      this.ervenService.fetchErven(townshipID);
      this.privateUseAreas = new PrivateUseAreas([this.defaultPUA]);
    }
    updateZoning(townshipID) {
      this.townplanningService.fetchZonings(townshipID);
    }
    erfChange(erfID) {
      this.updatePrivateUseAreas(erfID);
      this.updateBuildings(erfID, null);
      this.ervenService.setErf(erfID);
    }
    projectChange(projectID) {
      this.updateTownships(projectID);
      this.projectsService.setProject(projectID);
    }
    PUAChange(PUAID) {
      this.puaService.setPUA(PUAID);
      this.updateBuildings(null, PUAID);
    }
    updatePrivateUseAreas(erfID) {
      this.puaService.fetchPUA(erfID);
      this.contractorsService.fetchContractors(null, null, erfID, null, null);
    }
    updateBuildings(erfID, PUAID) {
      this.buildingsService.fetchBuildings(erfID, PUAID);
      this.contractorsService.fetchContractors(null, null, erfID, PUAID, null);
    }
    buildingChange(buildingID) {
      this.materialsService.fetchMaterials(buildingID, 'combined');
      this.buildingsService.setBuilding(buildingID);
    }
    toggleMode() {
      this.buildingMode = !this.buildingMode;
    }
    applyFilter(form: NgForm) {
      this.filterService.projectID = form.value.projectID;
      this.filterService.townshipID = form.value.townshipID;
      this.filterService.erfID = form.value.erfID;
      this.filterService.PUAID = form.value.PUAID;
      this.filterService.buildingID = form.value.buildingID;
      this.filterService.materialListType = form.value.materialListType;
      this.filterService.materialID = form.value.materialID;
      this.filterService.departmentID = form.value.departmentID;
      this.router.navigate(['/admin/placeOrders/processingList']);
    }
}
