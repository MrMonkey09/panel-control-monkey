import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiDepartment {
  constructor(private http: any) {
    console.log('Api Department seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'department';
    const req = new HttpRequest('POST', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allDeparments(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'department/all';
    return this.http.get(urlTemp);
  }

  getDeparment(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `department/${id}`;
    return this.http.get(urlTemp);
  }

  updateDeparment(body: any, id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `department/${id}`;
    const req = new HttpRequest('POST', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteDeparment(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `department/${id}`;
    return this.http.get(urlTemp);
  }
}
