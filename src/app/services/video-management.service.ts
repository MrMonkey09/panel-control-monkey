import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  recharge: boolean = false;
  video: any = '';
  constructor(private scrn: ScreensService) {}

  public observador(res: any) {
    console.log('Observador 1 Gatillado: ', res);
    if (res.filename) {
      this.recharge = false;
      this.video = 'http://192.168.0.19:3001/' + res.filename;
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

  public observador2(res: any) {
    console.log('Observador 2 Gatillado: ', res);
    const screenTemp = res.screen;
    const [groupTemp] = this.scrn.groupsScreen.filter(
      (group) => group.id === screenTemp.currentGroup
    );
    console.log({ screenTemp, groupTemp });

    /* this.recharge = false;
    this.video = 'http://192.168.0.19:3001/' + res.filename;
    setTimeout(() => {
      this.recharge = true;
    }, 100); */
  }
}
