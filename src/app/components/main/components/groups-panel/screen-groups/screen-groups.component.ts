import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GroupScreen_ } from 'src/app/interfaces/group-screen';
import { User_ } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/components/shared-module/services/api/api.service';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';
import { SocketioService } from 'src/app/components/shared-module/services/socketio.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';

@Component({
  selector: 'app-screen-groups',
  templateUrl: './screen-groups.component.html',
  styleUrls: ['./screen-groups.component.css'],
})
export class ScreenGroupsComponent implements OnInit {
  id?: any;
  constructor(
    public api: ApiService,
    private cookieService: CookieService,
    private sw: SocketioService,
    private http: HttpClient,
    public scrn: ScreensService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.cookieService.get('user-id');
    const userTemp = this.userService._userConstants.usersList.find(
      (user) => user.id === parseInt(this.id)
    );
    console.log('ID User_ Logged: ', this.id);
    console.log(userTemp);
    this.scrn._constants.isActiveGroup = false;
    if (userTemp) {
      this.takeScreenGroups(userTemp);
      this.scrn.getAvalaiblescreens(userTemp);
      console.log({
        screensAvalaibles: this.scrn._constants.avalaibles,
      });
    }
  }

  takeScreens(group: GroupScreen_) {
    console.log('Cargando pantallas de: ' + group.name);
    this.scrn._constants.currentGroup = group;
    this.scrn._constants.isCurrentGroup = true;
    this.scrn._constants.isActiveGroup = true;
    this.scrn._constants.isCreateGroupOpened = false;
    console.log(
      'Grupo actual: ' + this.scrn._constants.currentGroup.name
    );
    console.log(
      'Video del grupo actual: ' +
        this.scrn._constants.currentGroup.currentVideo
    );
    this.api._apiConstants.recharge = false;
    setTimeout(() => {
      this.api._apiConstants.recharge = true;
    }, 100);
  }

  takeScreenGroups(user: User_) {
    this.scrn.getScreenGroups(user);
  }

  addGroup() {
    this.scrn._constants.isCreateGroupOpened = true;
    this.scrn._constants.isActiveGroup = false;
  }

  delGroup(group: GroupScreen_) {
    this.scrn.delGroup(
      group,
      this.userService._userConstants.usersList[this.id]
    );
  }
}
