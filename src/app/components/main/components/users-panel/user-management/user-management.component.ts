import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  constructor(public userService: UserServiceService, public constants: ConstantsService) {}
  ngOnInit(): void {}
}
