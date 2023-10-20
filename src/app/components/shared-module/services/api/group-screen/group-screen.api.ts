import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class apiGroupScreen {
  constructor(private http: any, private _apiConstants: any) {
    console.log('Api GroupScreen seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'group-screen/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allGroupsScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'group-screen/all';
    return this.http.get(urlTemp);
  }

  getGroupScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'group-screen/{id}';
    return this.http.get(urlTemp);
  }

  updateGroupScreen(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'group-screen/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteGroupScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'group-screen/{id}/delete';
    return this.http.delete(urlTemp);
  }
}
