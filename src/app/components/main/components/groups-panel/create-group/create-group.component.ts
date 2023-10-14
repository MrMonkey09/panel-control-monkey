import { Component, OnInit } from '@angular/core';
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
    public userService: UserServiceService
  ) {}
  ngOnInit(): void {}

  addGroup() {
    /* if (this.userService._userConstants.user) {
      this.scrn.createGroup(this.userService._userConstants.user);
    } */
  }
}
