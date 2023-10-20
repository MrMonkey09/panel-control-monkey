import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class apiScreen {
  constructor(private http: any, private _apiConstants: any) {
    console.log('Api Screen seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allScreens(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen/all';
    return this.http.get(urlTemp);
  }

  getScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen/{id}';
    return this.http.get(urlTemp);
  }
  
  matchScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen';
    return this.http.get(urlTemp);
  }

  updateScreen(body: any): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteScreen(): Observable<any> {
    const urlTemp = this._apiConstants.urlApi + 'screen/{id}/delete';
    return this.http.delete(urlTemp);
  }
}