import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GroupScreen_ } from 'src/app/interfaces/group-screen';
import { User_ } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-screen-groups',
  templateUrl: './screen-groups.component.html',
  styleUrls: ['./screen-groups.component.css'],
})
export class ScreenGroupsComponent implements OnInit, AfterViewInit {
  id?: any;
  resTemp!: any;
  constructor(
    public api: ApiService,
    public scrn: ScreensService,
    public userService: UserServiceService,
    public constants: ConstantsService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.start();
  }

  takeScreens(group: GroupScreen_) {
    console.log('Cargando el grupo de pantallas: ' + group.Name);
    this.constants._scrnConstants.currentGroup = group;
    this.constants._scrnConstants.isCurrentGroup = true;
    this.constants._scrnConstants.isActiveGroup = true;
    this.constants._scrnConstants.isCreateGroupOpened = false;
    console.log({
      'Grupo seleccionado': this.constants._scrnConstants.currentGroup,
    });
    this.constants._apiConstants.recharge = false;
    setTimeout(() => {
      this.constants._apiConstants.recharge = true;
    }, 100);
  }

  addGroup() {
    console.log('Abriendo panel para añadir grupo de pantallas');
    this.constants._scrnConstants.isCreateGroupOpened = true;
    this.constants._scrnConstants.isActiveGroup = false;
  }

  start() {
    console.log('Obteniendo todos los lugares...');
    this.api.apiLocation.allLocations().subscribe({
      next: (res) => {
        this.resTemp = res;
      },
      complete: () => {
        console.log({ locations: this.resTemp });
        this.constants._scrnConstants.locations = this.resTemp;
        const userTemp = this.constants._userConstants.user;
        console.log({ userTemp });
        if (userTemp) {
          console.log('Obteniendo todos los grupos de pantallas...');
          this.api.apiGroupScreen.allGroupsScreen().subscribe({
            next: (res) => {
              this.resTemp = res;
            },
            complete: () => {
              this.constants._scrnConstants.groupsScreen = this.resTemp;
              console.log({
                newGroupsList: this.constants._scrnConstants.groupsScreen,
              });
              this.scrn.getScreenGroups(userTemp);
              console.log('Obteniendo todas las pantallas...');
              this.api.apiScreen.allScreens().subscribe({
                next: (res) => {
                  this.resTemp = res;
                },
                complete: () => {
                  this.constants._scrnConstants.screenList = this.resTemp;
                  console.log({
                    newScreenList: this.constants._scrnConstants.screenList,
                  });
                  this.scrn.getAvalaiblescreens(userTemp);
                  console.log({
                    newScreensAvalaibles:
                      this.constants._scrnConstants.avalaibles,
                  });
                },
              });
            },
          });
        }
      },
    });
  }
}
