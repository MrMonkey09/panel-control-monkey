import { Component, OnInit } from '@angular/core';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

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
