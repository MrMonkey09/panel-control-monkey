import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-screen-panel',
  templateUrl: './screen-panel.component.html',
  styleUrls: ['./screen-panel.component.css'],
})
export class ScreenPanelComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService,
    public constants: ConstantsService
  ) {}

  ngOnInit(): void {}

  openScreenActivated() {
    console.log('Abriendo panel de activacion de pantallas...');
    this.constants._scrnConstants.isPanelScreenUsed = true;
    this.constants._scrnConstants.isScreenActivatedOpened = true;
    this.constants._scrnConstants.isScreenModifiedOpened = false;
    this.constants._scrnConstants.isScreenDesactivatedOpened = false;
    console.log({ queue: this.constants._scrnConstants.screensDetectedQueue });
  }

  openScreenModified() {
    console.log('Abriendo panel de modificacion de pantallas...');
    this.constants._scrnConstants.isPanelScreenUsed = true;
    this.constants._scrnConstants.isScreenActivatedOpened = false;
    this.constants._scrnConstants.isScreenModifiedOpened = true;
    this.constants._scrnConstants.isScreenDesactivatedOpened = false;
    console.log({ avalaibles: this.constants._scrnConstants.avalaibles });
  }

  openScreenDesactivated() {
    console.log('Abriendo panel de desactivador de pantallas...');
    this.constants._scrnConstants.isPanelScreenUsed = true;
    this.constants._scrnConstants.isScreenActivatedOpened = false;
    this.constants._scrnConstants.isScreenModifiedOpened = false;
    this.constants._scrnConstants.isScreenDesactivatedOpened = true;
    console.log({ avalaibles: this.constants._scrnConstants.avalaibles });
  }
}
