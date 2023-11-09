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
}
