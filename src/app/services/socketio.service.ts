import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SocketioService extends Socket {
  callback: EventEmitter<any> = new EventEmitter();
  constructor(public cookieService: CookieService) {
    super({
      url: 'http://192.168.0.15:3001',
      options: {
        query: {
          user: cookieService.get('user-id'),
        },
      },
    });
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('video', (res: any) => this.callback.emit(res));
    this.ioSocket.on('screen', (res: any) => this.callback.emit(res));
    this.ioSocket.on('group', (res: any) => this.callback.emit(res));
  };

  emitEvento = (topic: string, payload: any) => {
    console.log(payload);
    this.ioSocket.emit(topic, payload);
  };
}
