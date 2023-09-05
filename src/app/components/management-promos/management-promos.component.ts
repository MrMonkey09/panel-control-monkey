import { Component, OnInit } from '@angular/core';
import { groupScreenList } from 'src/app/fake-data/groups-screen';

@Component({
  selector: 'app-management-promos',
  templateUrl: './management-promos.component.html',
  styleUrls: ['./management-promos.component.css'],
})
export class ManagementPromosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  video: string = '../../../assets/videos/video_prueba - copia.mp4';
  groupsScreen = groupScreenList;
}
