import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/fake-data/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  user = users[0];
}
