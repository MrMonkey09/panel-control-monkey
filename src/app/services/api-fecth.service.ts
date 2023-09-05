import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFecthService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:3000/';

  okis(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  wena(oka: string) {
    console.log(oka.valueOf());
  }
}
