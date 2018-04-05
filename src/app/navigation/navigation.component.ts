import { AuthService } from '../auth/auth.service';
import { Menu } from '../models/menu.model';
import { MenuGroup } from '../models/menuGroup.model';
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
  constructor(private authService: AuthService, private menusService: MenusService, private http: HttpClient) { }

  menuGroups: MenuGroup[];

  ngOnInit() {
    this.menusService.menuChanged.subscribe(
      (menuGroups: MenuGroup[]) => {
        this.menuGroups = menuGroups;
        }
    );
    this.menusService.fetchMenus();
  }
}
