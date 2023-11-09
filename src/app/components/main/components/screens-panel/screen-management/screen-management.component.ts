import { Component, OnInit } from '@angular/core';
import { ScreensService } from '../../../../../services/screens.service';
import { UserServiceService } from '../../../../../services/user-service.service';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-screen-management',
  templateUrl: './screen-management.component.html',
  styleUrls: ['./screen-management.component.css'],
})
export class ScreenManagementComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService,
    public constants: ConstantsService
  ) {}

  ngOnInit(): void {}
}
