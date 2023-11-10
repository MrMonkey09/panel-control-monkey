import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _apiFetchConstants } from 'src/app/constants/api-fetch.constants';

export class apiSharedApi {
  constructor(private http: any) {
    console.log('Api Shared-Api seccion Cargada');
  }

  apiUpload(body: FormData): Observable<any> {
    console.log({ body });
    const req = new HttpRequest(
      'POST',
      _apiFetchConstants.urlApi + 'subir-archivo',
      body,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    console.log({ req });
    return this.http.request(req);
  }
}
