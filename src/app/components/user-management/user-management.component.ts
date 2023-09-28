import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  constructor(public userService: UserServiceService) {}
  ngOnInit(): void {}
}
