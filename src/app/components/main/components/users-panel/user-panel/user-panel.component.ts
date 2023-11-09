import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})
export class UserPanelComponent implements OnInit {
  constructor(public userService: UserServiceService, public constants: ConstantsService) {}
  ngOnInit(): void {}
}
