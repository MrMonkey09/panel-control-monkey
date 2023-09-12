import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(
    public api: ApiFecthService,
    private cookieService: CookieService,
    private sw: SocketioService
  ) {}
  ngOnInit(): void {
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
      console.log(res.data);
      this.api.getVideo2().subscribe((res) => this.api.observador(res));
      console.log(this.api.video);
      this.sw.emitEvento({ video: this.api.video });
    });
  }

  getVideo() {
    this.api.getVideo2().subscribe((res) => this.api.observador(res));
  }
}
