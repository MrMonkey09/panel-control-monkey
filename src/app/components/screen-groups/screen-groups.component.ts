import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GroupScreen } from 'src/app/interfaces/group-screen';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-screen-groups',
  templateUrl: './screen-groups.component.html',
  styleUrls: ['./screen-groups.component.css'],
})
export class ScreenGroupsComponent implements OnInit {
  id?: any;
  constructor(
    public api: ApiFecthService,
    private cookieService: CookieService,
    private sw: SocketioService,
    private http: HttpClient,
    public scrn: ScreensService
  ) {}

  ngOnInit(): void {
    this.id = this.cookieService.get('user-id');
    console.log('ID User Logged: ', this.id);
  }

  takeScreens(group: GroupScreen) {
    console.log('Cargando pantallas de: ' + group.name);
    this.scrn.currentGroup = group;
    this.scrn.currentGroup.isActive = true;
    console.log('Grupo actual: ' + this.scrn.currentGroup.name);
    console.log(
      'Video del grupo actual: ' + this.scrn.currentGroup.currentVideo
    );
    this.api.recharge = false;
    setTimeout(() => {
      this.api.recharge = true;
    }, 100);
  }
}
