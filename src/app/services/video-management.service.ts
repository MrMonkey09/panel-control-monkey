import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  recharge: boolean = false;
  video: any = '';
  constructor(private scrn: ScreensService) {}

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
    const screenTemp = res.screen;
    const groupTemp = res.group;
    if (screenTemp.id === this.scrn.currentScreen.id) {
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
          this.scrn.groupsScreen[this.scrn.currentGroup.id - 1].currentVideo
        );
        this.recharge = true;
      }, 100);
    }
  }
}
