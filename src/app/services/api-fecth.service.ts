import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFecthService {
  constructor(private http: HttpClient) {}
  private urlApi = 'http://192.168.0.15:3001/';
  public result = 0;
  public video!: string;
  public recharge: boolean = false;

  public observador(res: any) {
    console.log('Observador 1 Gatillado: ', res.filename);
    this.recharge = false;
    this.video = 'http://192.168.0.15:3001/' + res.filename;
    setTimeout(() => {
      this.recharge = true;
    }, 100);
  }

  public observador2(res: any) {
    console.log('Observador 2 Gatillado: ', res);
    const groupTemp = res.group;
    const screenTemp = res.screen;
    console.log({groupTemp,screenTemp});
    /* this.recharge = false;
    this.video = 'http://192.168.0.15:3001/' + res.filename;
    setTimeout(() => {
      this.recharge = true;
    }, 100); */
  }

  getScreen(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  apiUpload(body: FormData): Observable<any> {
    const req = new HttpRequest('POST', this.urlApi + 'subir-archivo', body, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}
