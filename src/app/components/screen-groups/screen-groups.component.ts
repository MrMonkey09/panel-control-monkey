import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GroupScreen } from 'src/app/interfaces/group-screen';
import { User } from 'src/app/interfaces/user';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserServiceService } from 'src/app/services/user-service.service';

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
    public scrn: ScreensService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.cookieService.get('user-id');
    const userTemp = this.userService.usersList.find(
      (user) => user.id === parseInt(this.id)
    );
    console.log('ID User Logged: ', this.id);
    console.log(userTemp);
    this.scrn.isActiveGroup = false;
    if (userTemp) {
      this.takeScreenGroups(userTemp);
    }
    if (this.id) {
      const findUser: any = this.userService.usersList.find(
        (user) => user.id.toString() === this.cookieService.get('user-id')
      );
      if (findUser) {
        this.scrn.getAvalaiblescreens(findUser);
      }
    }
  }

  takeScreens(group: GroupScreen) {
    console.log('Cargando pantallas de: ' + group.name);
    this.scrn.currentGroup = group;
    this.scrn.isCurrentGroup = true;
    this.scrn.isActiveGroup = true;
    this.scrn.isCreateGroupOpened = false;
    console.log('Grupo actual: ' + this.scrn.currentGroup.name);
    console.log(
      'Video del grupo actual: ' + this.scrn.currentGroup.currentVideo
    );
    this.api.recharge = false;
    setTimeout(() => {
      this.api.recharge = true;
    }, 100);
  }

  takeScreenGroups(user: User) {
    this.scrn.getScreenGroups(user);
  }

  addGroup() {
    this.scrn.isCreateGroupOpened = true;
    this.scrn.isActiveGroup = false;
  }

  delGroup(group: GroupScreen) {
    this.scrn.delGroup(group, this.userService.usersList[this.id]);
  }
}
