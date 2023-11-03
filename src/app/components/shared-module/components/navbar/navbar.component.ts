import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService
  ) {}

  ngOnInit(): void {
    console.log('NavBar Component Cargado');
  }

  openScreenPanel() {
    this.scrn._constants.isPanelScreenOpened = true;
    this.userService._userConstants.isCreateUserOpened = false;
    this.userService._userConstants.isDeleteUserOpened = false;
    this.userService._userConstants.isUpdateUserOpened = false;
    this.userService._userConstants.isUserPanelOpened = false;
    this.scrn._constants.isCurrentGroup = false;
    this.scrn._constants.isCreateGroupOpened = false;
  }
}
