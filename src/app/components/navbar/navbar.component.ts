import { Component, OnInit } from '@angular/core';
import { users } from '../../fake-data/users';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserServiceService) {}

  ngOnInit(): void {
  }
  
}
