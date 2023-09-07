import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { groupScreenList } from 'src/app/fake-data/groups-screen';
import { ApiFecthService } from 'src/app/services/api-fecth.service';

@Component({
  selector: 'app-management-promos',
  templateUrl: './management-promos.component.html',
  styleUrls: ['./management-promos.component.css'],
})
export class ManagementPromosComponent implements OnInit {
  constructor(public api: ApiFecthService) {}
  ngOnInit(): void {}
  groupsScreen = groupScreenList;
}
