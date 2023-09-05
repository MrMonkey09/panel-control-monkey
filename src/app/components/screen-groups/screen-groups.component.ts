import { Component, OnInit } from '@angular/core';
import { groupScreenList } from 'src/app/fake-data/groups-screen';

@Component({
  selector: 'app-screen-groups',
  templateUrl: './screen-groups.component.html',
  styleUrls: ['./screen-groups.component.css'],
})
export class ScreenGroupsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  groupsScreen = groupScreenList
}
