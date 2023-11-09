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
      this.scrn.createGroup(this.constants._userConstants.user);
    }
  }
}
