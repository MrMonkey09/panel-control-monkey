import { Component, OnInit } from '@angular/core';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';

@Component({
  selector: 'app-screen-panel',
  templateUrl: './screen-panel.component.html',
  styleUrls: ['./screen-panel.component.css'],
})
export class ScreenPanelComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public scrn: ScreensService
  ) {}

  ngOnInit(): void {}
}
