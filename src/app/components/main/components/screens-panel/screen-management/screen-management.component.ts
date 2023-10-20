import { Component, OnInit } from '@angular/core';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';

@Component({
  selector: 'app-screen-management',
  templateUrl: './screen-management.component.html',
  styleUrls: ['./screen-management.component.css'],
})
export class ScreenManagementComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService
  ) {}

  ngOnInit(): void {}
}
