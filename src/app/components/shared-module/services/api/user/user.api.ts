import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class apiUser {
  constructor(private http: any, private _apiConstants: any) {
    console.log('Api User seccion Cargada');
  }

  createUser(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'user/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allUsers(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'user/all';
    return this.http.get(urlTemp);
  }

  getUser(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'user/{id}';
    return this.http.get(urlTemp);
  }

  updateUser(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'user/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteUser(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'user/{id}/delete';
    return this.http.delete(urlTemp);
  }
}
