import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  constructor(
    public scrn: ScreensService,
    public userService: UserServiceService,
    public constants: ConstantsService
  ) {}
  ngOnInit(): void {}

  addGroup() {
    if (this.constants._userConstants.user) {
      if (this.constants._scrnConstants.groupFormTemp.Name !== '') {
        const groupNameMatch = this.constants._scrnConstants.groupsScreen.find(
          (groupOld) =>
            groupOld.Name === this.constants._scrnConstants.groupFormTemp.Name
        );
        if (!groupNameMatch) {
          this.scrn.createGroup(this.constants._userConstants.user);
          this.constants._scrnConstants.isCreateGroupOpened = false;
        } else {
          console.error('Este nombre ya ha sido usado, utilice otro');
        }
      } else {
        console.error('Por favor ingresar nombre valido');
      }
    } else {
      console.error('Ninguna sesion iniciada');
    }
  }
}
