import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { groupScreenList } from 'src/app/fake-data/groups-screen';
import { GroupScreen } from 'src/app/interfaces/group-screen';
import { Screen } from 'src/app/interfaces/screen';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-management-promos',
  templateUrl: './management-promos.component.html',
  styleUrls: ['./management-promos.component.css'],
})
export class ManagementPromosComponent implements OnInit {
  id?: any;
  progress: { value: number | null; inProgress: boolean; message: string } = {
    value: 0,
    inProgress: false,
    message: '',
  };
  progressManagement = new Observable((subscriber) => {
    subscriber.next(this.progress);
    subscriber.complete();
  });

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
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res), this.api.observador(res.data);
    });
  }

  // Logica de la subida y despliegue de videos
  public fileTemp: any;
  private body = new FormData();

  getFile($event: any) {
    console.log($event);
    const [file] = $event.target.files;
    console.log(file);
    this.fileTemp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  uploadFile() {
    this.body.delete('myFile');
    this.body.append('myFile', this.fileTemp.fileRaw, this.fileTemp.fileName);
    console.log(this.body.get('myFile'));
    this.api.apiUpload(this.body).subscribe({
      next: (res) => {
        console.log(res.type);
        if (res.type === HttpEventType.UploadProgress) {
          this.progressManagement
            .subscribe({
              next: () => {
                this.progress = {
                  value: Math.round((100 * res.loaded) / res.total),
                  inProgress: true,
                  message: '',
                };
                console.log(res);
              },
            })
            .unsubscribe();
        }
      },
      complete: () => {
        this.api.getVideo().subscribe({
          next: (res) => {
            this.api.observador(res);
          },
          complete: () => {
            console.log(this.api.video);
            this.sw.emitEvento({ video: this.api.video });
            this.scrn.currentGroup.currentVideo = this.api.video;
            this.progress = {
              value: 0,
              inProgress: false,
              message: 'Carga completada.',
            };
            console.log(this.scrn.currentGroup.currentVideo);
            console.log('completado');
            setTimeout(() => {
              this.progress = {
                value: 0,
                inProgress: false,
                message: '',
              };
            }, 2000);
          },
        });
      },
    });
  }

  getVideo() {
    this.api.getVideo().subscribe((res) => this.api.observador(res));
  }
}
