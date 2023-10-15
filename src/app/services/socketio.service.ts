import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { _ApiFetchConstants } from '../constants/api-fetch.constants';

@Injectable({
  providedIn: 'root',
})
export class SocketioService extends Socket {
  callback: EventEmitter<any> = new EventEmitter();
  constructor(public cookieService: CookieService) {
    const _apiConstants = new _ApiFetchConstants();
    super({
      url: _apiConstants.urlApi,
      options: {
        query: {
          user: cookieService.get('user-id'),
        },
      },
    });
    this.listen();
    console.log('SocketIo Servicio Cargado');
  }

  listen = () => {
    this.ioSocket.on('video', (res: any) => this.callback.emit(res));
    this.ioSocket.on('screen', (res: any) => this.callback.emit(res));
    this.ioSocket.on('group', (res: any) => this.callback.emit(res));
    this.ioSocket.on('cont', (res: any) => this.callback.emit(res));
  };

  emitEvento = (topic: string, payload: any) => {
    console.log(payload);
    this.ioSocket.emit(topic, payload);
  };
}
