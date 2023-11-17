import { Component, OnInit } from '@angular/core';
import { _scrnConstants } from 'src/app/constants/screens.constants';
import { Screen_ } from 'src/app/interfaces/screen';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { VideoManagementService } from 'src/app/services/video-management.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.css'],
})
export class VideoPlayerPage implements OnInit {
  public indexGroup!: number;
  public screenRes!: { width: number; height: number };
  private resTemp!: any;
  public videoPlayer!: any;

  constructor(
    public scrn: ScreensService,
    public api: ApiService,
    public sw: SocketioService,
    public vm: VideoManagementService,
    public constants: ConstantsService
  ) {
    this.sw.callback.subscribe((res: any) => {
      const groupDetected = res.groupDetected;
      const screenDetected = res.screenDetected;
      if (screenDetected || groupDetected) {
        console.log('Cambio detectado: ', res);
        if (
          !res.isOutListGroup &&
          screenDetected &&
          (screenDetected.IP ===
            this.constants._scrnConstants.currentScreen.IP ||
            screenDetected.IP === this.constants._scrnConstants.currentScreen)
        ) {
          console.log('cambio en la pantalla actual');
          this.constants._scrnConstants.currentScreen = screenDetected;
          console.log('pantalla actualizada');
        } else if (
          res.isOutListGroup &&
          screenDetected &&
          screenDetected.IP === this.constants._scrnConstants.currentScreen.IP
        ) {
          console.log('quitando pantalla del grupo');
          this.constants._videoConstants.recharge = false;
          this.constants._scrnConstants.currentScreen = screenDetected;
          this.constants._scrnConstants.currentGroup = {
            Name: '',
            ScreenList: [],
            CurrentVideo: '',
            DepartmentID: -1,
          };
        }
        if (
          groupDetected &&
          !res.isUploadVideo &&
          !res.isOutListGroup &&
          (!this.constants._scrnConstants.currentGroup ||
            this.constants._scrnConstants.currentGroup.Name === '')
        ) {
          this.constants._videoConstants.recharge = false;
          console.log('agregando pantalla a un grupo');
          this.constants._scrnConstants.currentGroup = groupDetected;
          setTimeout(() => {
            this.constants._videoConstants.recharge = true;
          }, 100);
        } else if (
          !res.isOutListGroup &&
          groupDetected &&
          groupDetected.ID ===
            this.constants._scrnConstants.currentScreen.CurrentGroupID
        ) {
          this.constants._videoConstants.recharge = false;
          console.log('cambio al grupo de la pantalla');
          this.constants._scrnConstants.currentGroup = groupDetected;
          setTimeout(() => {
            this.constants._videoConstants.recharge = true;
          }, 100);
        }
      }
    });
  }

  ngOnInit(): void {
    console.log('VideoPlayer Page cargado');
    this.start();
  }

  start() {
    console.log('Obteniendo todas las pantallas...');
    this.api.apiScreen.allScreens().subscribe({
      next: (res) => {
        this.resTemp = res;
      },
      complete: () => {
        console.log({
          screenList: this.resTemp,
        });
        this.api.apiScreen.matchScreen().subscribe({
          next: (res) => {
            this.constants._scrnConstants.currentScreen = res;
          },
          complete: () => {
            console.log({
              screenDetected: this.constants._scrnConstants.currentScreen,
            });
            if (this.resTemp.length !== 0) {
              const screenFound = this.resTemp.find(
                (screen: any) =>
                  screen.IP === this.constants._scrnConstants.currentScreen
              );
              if (screenFound && screenFound.DepartmentID) {
                console.log('Pantalla Activa encontrada');
                this.constants._scrnConstants.currentScreen = screenFound;
                this.resTemp = undefined;
                if (
                  this.constants._scrnConstants.currentScreen.CurrentGroupID
                ) {
                  this.api.apiGroupScreen
                    .getGroupScreen(
                      this.constants._scrnConstants.currentScreen.CurrentGroupID
                    )
                    .subscribe({
                      next: ([res]) => {
                        if (res) {
                          this.constants._scrnConstants.currentGroup = res;
                        }
                      },
                      complete: () => {
                        if (this.constants._scrnConstants.currentGroup) {
                          console.log({
                            currentGroup:
                              this.constants._scrnConstants.currentGroup,
                          });
                          this.constants._videoConstants.recharge = true;
                          console.log({ videoPlayer: this.videoPlayer });
                        }
                      },
                    });
                }
              } else {
                console.log('Pantalla no activada');
                this.sw.emitEvento('screen', {
                  screenDetected: this.constants._scrnConstants.currentScreen,
                  isActive: false,
                });
                this.resTemp = undefined;
              }
            } else {
              console.log('Pantalla no activada');
              this.sw.emitEvento('screen', {
                screenDetected: this.constants._scrnConstants.currentScreen,
                isActive: false,
              });
              this.resTemp = undefined;
            }
          },
        });
      },
    });
  }
}
