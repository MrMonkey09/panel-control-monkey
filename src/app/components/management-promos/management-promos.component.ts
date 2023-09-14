import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { groupScreenList } from 'src/app/fake-data/groups-screen';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-management-promos',
  templateUrl: './management-promos.component.html',
  styleUrls: ['./management-promos.component.css'],
})
export class ManagementPromosComponent implements OnInit {
  id?: any;
  progress = new Subject<any>();

  constructor(
    public api: ApiFecthService,
    private cookieService: CookieService,
    private sw: SocketioService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.progress.subscribe((progress) => {
      console.log(progress);
    });
    this.progress.next(false);
    this.id = this.cookieService.get('user-id');
    console.log('ID User Logged: ', this.id);
    this.getVideo();
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res), this.api.observador(res.data);
    });
  }

  groupsScreen = groupScreenList;
  private fileTemp: any;
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
    this.api.apiUpload(this.body).subscribe((res) => {
      console.log(res.type);
      if (res.type === HttpEventType.UploadProgress) {
        this.progress.next(Math.round((100 * res.loaded) / res.total));
      } else if (res instanceof HttpResponse) {
        console.log('carga terminada');
      }
      this.api.getVideo().subscribe((res) => this.api.observador(res));
      console.log(this.api.video);
      this.sw.emitEvento({ video: this.api.video });
    });
    this.progress.next(false);
  }

  getVideo() {
    this.api.getVideo().subscribe((res) => this.api.observador(res));
  }
}
