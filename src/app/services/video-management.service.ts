import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  recharge: boolean = false;
  video: any = '';
  constructor(
    private scrn: ScreensService,
    private userService: UserServiceService
  ) {}

  public $updateVideo(res: any) {
    console.log('$updateVideo 1 Gatillado: ', res);
    if (res.filename) {
      this.recharge = false;
      this.video = 'http://192.168.0.15:3001/' + res.filename;
      setTimeout(() => {
        this.recharge = true;
      }, 100);
    } else if (res.video) {
      console.log(this.scrn.groupsScreen[res.group.id - 1]);
      this.recharge = false;
      this.scrn.groupsScreen[res.group.id - 1].currentVideo = res.video;
      setTimeout(() => {
        this.recharge = true;
      }, 100);
    }
  }

  public $updateScreen(res: any) {
    this.recharge = false;
    console.log('$updateVideo 2 Gatillado: ', res);
    const screenTemp = res.screenDel ? res.screenDel : res.screen;
    const groupTemp = res.group;
    if (this.scrn.avaibles.find((screen) => screenTemp.id === screen.id)) {
      if (
        this.scrn.currentGroup &&
        this.scrn.currentScreen &&
        this.scrn.currentGroup.id === groupTemp.id &&
        this.scrn.currentScreen.id === screenTemp.id
      ) {
        console.log('Pantalla actualizada');
        console.log({ screenTemp, groupTemp });
        this.scrn.groupsScreen[groupTemp.id - 1] = groupTemp;
        this.scrn.currentGroup =
          this.scrn.groupsScreen[screenTemp.currentGroup - 1];
        this.scrn.currentScreen = screenTemp;
        setTimeout(() => {
          console.log({
            'pantalla actualizada': 'Ok',
            'current screen': this.scrn.currentScreen,
            'current group': this.scrn.currentGroup,
          });
          console.log(
            this.scrn.currentGroup
              ? this.scrn.groupsScreen[this.scrn.currentGroup.id - 1]
                  .currentVideo
              : 'Sin grupo actual'
          );
          this.recharge = true;
        }, 100);
      } else if (res.screenDel) {
        console.log('Pantalla actualizada');
        console.log({ screenTemp, groupTemp });
        this.scrn.groupsScreen[
          this.scrn.groupsScreen.findIndex((group) => group.id === groupTemp.id)
        ] = groupTemp;
        this.scrn.activeGroupScreens[
          this.scrn.activeGroupScreens.findIndex(
            (group) => group.id === groupTemp.id
          )
        ] = groupTemp;
        this.scrn.avaibles[
          this.scrn.avaibles.findIndex((screen) => screenTemp.id === screen.id)
        ] = screenTemp;
        this.scrn.avaibles = this.scrn.avaibles.filter(
          (screen) => screen.id !== screenTemp.id
        );
        console.log({
          groupUpdate:
            this.scrn.groupsScreen[
              this.scrn.groupsScreen.findIndex(
                (group) => group.id === groupTemp.id
              )
            ],
          screenUpdate:
            this.scrn.avaibles[
              this.scrn.avaibles.findIndex(
                (screen) => screenTemp.id === screen.id
              )
            ],
          newAvaibles: res.newAvaibles,
        });
      } else {
        console.log('Pantalla actualizada');
        console.log({ screenTemp, groupTemp });
        this.scrn.groupsScreen[
          this.scrn.groupsScreen.findIndex((group) => group.id === groupTemp.id)
        ] = groupTemp;
        this.scrn.activeGroupScreens[
          this.scrn.activeGroupScreens.findIndex(
            (group) => group.id === groupTemp.id
          )
        ] = groupTemp;
        this.scrn.avaibles[
          this.scrn.avaibles.findIndex((screen) => screenTemp.id === screen.id)
        ] = screenTemp;
        this.scrn.avaibles = this.scrn.avaibles.filter(
          (screen) => screen.id !== screenTemp.id
        );
        console.log({
          groupUpdate:
            this.scrn.groupsScreen[
              this.scrn.groupsScreen.findIndex(
                (group) => group.id === groupTemp.id
              )
            ],
          screenUpdate:
            this.scrn.avaibles[
              this.scrn.avaibles.findIndex(
                (screen) => screenTemp.id === screen.id
              )
            ],
          newAvaibles: res.newAvaibles,
        });
      }
    }
  }
}
