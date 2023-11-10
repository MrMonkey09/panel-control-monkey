import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiGroupScreen {
  constructor(private http: any) {
    console.log('Api GroupScreen seccion Cargada');
  }

  createGroupScreen(body: any): Observable<any> {
    console.log({ body });
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen';
    const req = new HttpRequest('POST', urlTemp, body, {
      reportProgress: false,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allGroupsScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen/all';
    return this.http.get(urlTemp);
  }

  getGroupScreen(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `group-screen/${id}`;
    return this.http.get(urlTemp);
  }

  updateGroupScreen(body: any, id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `group-screen/${id}`;
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: false,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteGroupScreen(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `group-screen/${id}`;
    return this.http.delete(urlTemp);
  }
}
