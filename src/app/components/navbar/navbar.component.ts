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
    this.scrn._screensConstants.isPanelScreenOpened = true;
    this.userService._userConstants.isCreateUserOpened = false;
    this.userService._userConstants.isDeleteUserOpened = false;
    this.userService._userConstants.isUpdateUserOpened = false;
    this.userService._userConstants.isUserPanelOpened = false;
    this.scrn._screensConstants.isCurrentGroup = false;
    this.scrn._screensConstants.isCreateGroupOpened = false;
    
  }
}
