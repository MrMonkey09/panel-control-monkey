import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, AfterViewInit {
  screenRes!: { width: number; height: number };
  constructor(
    public cookieService: CookieService,
    public constants: ConstantsService,
    public scrnService: ScreensService,
    public api: ApiService,
    private sw: SocketioService
  ) {
    this.sw.callback.subscribe((res: any) => {
      if (this.cookieService.get('user-id')) {
        console.log('Cambio detectado: ', res);
        /* if (res.screen || res.screenDel) {
            this.vm.$updateScreen(res);
          } else if (res.video) {
            this.vm.$updateVideo(res);
          } else if (res.groups) {
            console.log('update groups');
            setTimeout(() => {
              if (this.constants._userConstants.user) {
                this.constants._scrnConstants.groupsScreen = res.groups;
                this.scrn.getScreenGroups(this.constants._userConstants.user);
              }
            }, 100);
          } else if (res.cont) {
            console.log('nuevo grupo, cantidad actual: ' + res.cont);
          } */
      }
    });
  }

  ngOnInit(): void {
    console.log('Home Component Cargado');
  }

  ngAfterViewInit(): void {}
}
