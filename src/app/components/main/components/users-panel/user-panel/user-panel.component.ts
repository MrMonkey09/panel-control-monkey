import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public constants: ConstantsService
  ) {}
  ngOnInit(): void {}

  openCreateUser() {
    console.log('Abriendo panel de creacion de usuarios...');
    this.constants._userConstants.isPanelUsed = true;
    this.constants._userConstants.isCreateUserOpened = true;
    this.constants._userConstants.isDeleteUserOpened = false;
    this.constants._userConstants.isUpdateUserOpened = false;
    this.constants._userConstants.currentUser = null;
    this.constants._userConstants.userFormTemp = {
      name: '',
      rut: '',
      email: '',
      password: '',
      newPass: '',
      confirmPass: '',
      department: 0,
    };
  }

  openUpdateUser() {
    console.log('Abriendo panel de modificacion de usuarios...');
    this.constants._userConstants.isPanelUsed = true;
    this.constants._userConstants.isCreateUserOpened = false;
    this.constants._userConstants.isDeleteUserOpened = false;
    this.constants._userConstants.isUpdateUserOpened = true;
    this.constants._userConstants.currentUser = null;
  }

  openDeleteUser() {
    console.log('Abriendo panel de eliminacion de usuarios...');
    this.constants._userConstants.isPanelUsed = true;
    this.constants._userConstants.isCreateUserOpened = false;
    this.constants._userConstants.isDeleteUserOpened = true;
    this.constants._userConstants.isUpdateUserOpened = false;
    this.constants._userConstants.currentUser = null;
    this.constants._userConstants.userFormTemp = {
      name: '',
      rut: '',
      email: '',
      password: '',
      newPass: '',
      confirmPass: '',
      department: 0,
    };
  }
}
