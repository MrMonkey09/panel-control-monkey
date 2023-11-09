import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiUser {
  constructor(private http: any) {
    console.log('Api User seccion Cargada');
  }

  createUser(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'user/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allUsers(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'user/all';
    return this.http.get(urlTemp);
  }

  getUser(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'user/{id}';
    return this.http.get(urlTemp);
  }

  updateUser(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'user/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteUser(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'user/{id}/delete';
    return this.http.delete(urlTemp);
  }
}
