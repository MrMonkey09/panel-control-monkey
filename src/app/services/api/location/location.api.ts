import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiLocation {
  constructor(private http: any) {
    console.log('Api Location seccion Cargada');
  }

  createScreen(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/create';
    const req = new HttpRequest('PUT', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  allLocations(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/all';
    return this.http.get(urlTemp);
  }

  getLocation(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/{id}';
    return this.http.get(urlTemp);
  }

  updateLocation(body: any): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/{id}/update';
    const req = new HttpRequest('PATCH', urlTemp, body, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  deleteLocation(): Observable<any> {
    const urlTemp = _apiFetchConstants.urlApi + 'location/{id}/delete';
    return this.http.delete(urlTemp);
  }
}
