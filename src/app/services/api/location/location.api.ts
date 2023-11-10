import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiLocation {
  constructor(private http: any) {
    console.log('Api Location seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location';
    const req = new HttpRequest('POST', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allLocations(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/all';
    return this.http.get(urlTemp);
  }

  getLocation(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `location/${id}`;
    return this.http.get(urlTemp);
  }

  updateLocation(body: any, id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `location/${id}`;
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteLocation(id: number): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + `location/${id}`;
    return this.http.delete(urlTemp);
  }
}
