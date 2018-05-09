import { AuthService } from '../auth/auth.service';
import { Menu } from '../models/menu.model';
import { MenuGroup } from '../models/menuGroup.model';
import { FilterService } from '../services/filter.service';
import { MenusService } from '../services/menus.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService, private menusService: MenusService, private filterService: FilterService, private http: HttpClient) { }
  private logo = require('../images/logo.jpg');
  private slogan = require('../images/slogan.png');
  menuGroups: MenuGroup[];
  breadcrumb = null;
  userName = null;
  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.filterService.updateBreadcrumb();
    this.menusService.menuChanged.subscribe(
      (menuGroups: MenuGroup[]) => {
        this.menuGroups = menuGroups;
        }
    );
    this.menusService.fetchMenus();
    this.filterService.breadcrumbChanged.subscribe(
      (breadcrumb: String) => {
        this.breadcrumb = breadcrumb;
        }
    );
  }
  
  logout() {
    this.authService.token = null;
  }
}
