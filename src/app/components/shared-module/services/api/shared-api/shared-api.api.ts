import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class apiSharedApi {
  constructor(private http: any, private _apiConstants: any) {
    console.log('Api Shared-Api seccion Cargada');
  }

  apiUpload(body: FormData): Observable<any> {
    const req = new HttpRequest(
      'POST',
      this._apiConstants.urlApi + 'subir-archivo',
      body,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }
}
