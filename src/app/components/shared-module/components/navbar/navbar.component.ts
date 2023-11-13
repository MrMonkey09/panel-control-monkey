import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  depIndex!: number;
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService,
    public constants: ConstantsService,
    public cookie: CookieService
  ) {}

  ngOnInit(): void {
    console.log('NavBar Component Cargado');
  }

  openScreenPanel() {
    this.constants._scrnConstants.isPanelScreenOpened = true;
    this.constants._userConstants.isCreateUserOpened = false;
    this.constants._userConstants.isDeleteUserOpened = false;
    this.constants._userConstants.isUpdateUserOpened = false;
    this.constants._userConstants.isUserPanelOpened = false;
    this.constants._scrnConstants.isCurrentGroup = false;
    this.constants._scrnConstants.isCreateGroupOpened = false;
  }

  closeScreenPanel() {
    console.log('Cerrando panel de pantallas...');
    this.constants._scrnConstants.isPanelScreenOpened = false;
    this.constants._scrnConstants.isScreenActivatedOpened = false;
    this.constants._scrnConstants.isScreenModifiedOpened = false;
    this.constants._scrnConstants.isScreenDesactivatedOpened = false;
  }

  openUserPanel() {
    console.log('Abriendo panel de usuario...');
    console.log('panel abierto');
    this.constants._userConstants.isUserPanelOpened = true;
    this.constants._userConstants.isBackButtonEnabled = true;
  }

  closeUserPanel() {
    console.log('Cerrando panel de usuario...');
    console.log('panel cerrado');
    this.constants._userConstants.isUserPanelOpened = false;
    this.constants._userConstants.isBackButtonEnabled = false;
    this.constants._userConstants.isPanelUsed = false;
    this.constants._userConstants.isCreateUserOpened = false;
    this.constants._userConstants.isDeleteUserOpened = false;
    this.constants._userConstants.isUpdateUserOpened = false;
    this.constants._userConstants.currentUser = null;
  }

  loggOut() {
    console.log('Cerrando sesion...');
    this.constants._userConstants.user = {
      ID: 0,
      Name: '-',
      Password: '-',
      Email: '-',
      DepartmentID: 0,
      Rut: '-',
    };
    this.cookie.delete('user-id');
    this.constants._scrnConstants.isActiveGroup = false;
    this.closeScreenPanel();
    this.closeUserPanel();
  }
}
