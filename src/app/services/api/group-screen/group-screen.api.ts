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
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: false,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allGroupsScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen/all';
    return this.http.get(urlTemp);
  }

  getGroupScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen/{id}';
    return this.http.get(urlTemp);
  }

  updateGroupScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: false,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteGroupScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'group-screen/{id}/delete';
    return this.http.delete(urlTemp);
  }
}
