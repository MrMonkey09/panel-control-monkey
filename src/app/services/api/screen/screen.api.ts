import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiScreen {
  constructor(private http: any) {
    console.log('Api Screen seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allScreens(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen/all';
    return this.http.get(urlTemp);
  }

  getScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen/{id}';
    return this.http.get(urlTemp);
  }
  
  matchScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen';
    return this.http.get(urlTemp);
  }

  updateScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen/{id}';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteScreen(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'screen/{id}';
    return this.http.delete(urlTemp);
  }
}