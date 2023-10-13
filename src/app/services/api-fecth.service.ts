import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _ApiFetchConstants } from '../constants/api-fetch.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiFecthService {
    _apiConstants = new _ApiFetchConstants()
  constructor(private http: HttpClient) {}

  getScreen() /* :Observable<any> */ {
    /*     const urlTemp = this._apiConstants.urlApi;
    return this.http.get(urlTemp); */
  }

  apiUpload(body: FormData) /* :Observable<any> */ {
    /*     const req = new HttpRequest(
      'POST',
      this._apiConstants.urlApi + 'subir-archivo',
      body,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req); */
  }
}
