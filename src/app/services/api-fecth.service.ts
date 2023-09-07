import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFecthService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://192.168.0.15:3001/';
  public videoPromo = 'http://192.168.0.15/promo-china.mp4';
  private fileTemp: any;
  public progress: number = 0;
  
  public video = {
    isRendering: true,
    reRendering() {
      setTimeout(() => {
        this.isRendering = false;
      }, 500);
      setTimeout(() => {
        this.isRendering = true;
      }, 500);
    },
    videoUrl: '',
  };

  apiGet(): Observable<any> {
    return this.http.get(this.urlApi + 'promo-china.mp4');
  }

  apiUpload(body: FormData): Observable<any> {
    return this.http
      .post(this.urlApi + 'subir-archivo', body, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  uploadFile() {
    const body = new FormData();
    body.append('myFile', this.fileTemp.fileRaw, this.fileTemp.fileName);
    this.apiUpload(body).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Peticion recibida!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Se ha recibido el encabezado de respuesta!');
          break;
        case HttpEventType.UploadProgress:
          console.log('Subiendo');
          if (!event.total) {
            event.total = 0;
          }
          this.progress = Math.round((event.loaded / event.total) * 100);
          console.log(`Cargando... ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Video subido exitosamente!', event.body);
          this.video.videoUrl =
            'http://192.168.0.15:3001/' + event.body.data;
          console.log(this.video);
          setTimeout(() => {
            this.progress = 0;
            this.video.reRendering();
          }, 1500);
      }
      return;
    });
  }
  
  getFile($event: any) {
    console.log($event);
    const [file] = $event.target.files;
    console.log(file);
    this.fileTemp = {
      fileRaw: file,
      fileName: file.name,
    };
  }
}
