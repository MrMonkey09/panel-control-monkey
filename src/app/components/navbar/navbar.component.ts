import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ScreensService } from 'src/app/services/screens.service';

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

  ngOnInit(): void {}

  openScreenPanel() {
    this.scrn.isPanelScreenOpened = true;
    this.userService.isCreateUserOpened = false;
    this.userService.isDeleteUserOpened = false;
    this.userService.isUpdateUserOpened = false;
    this.userService.isUserPanelOpened = false;
    this.scrn.isCurrentGroup = false;
    this.scrn.isCreateGroupOpened = false;
  }
}
