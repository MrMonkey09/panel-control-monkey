import { Component, OnInit } from '@angular/core';
import { users } from '../../fake-data/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }

  user = users[0]

}
