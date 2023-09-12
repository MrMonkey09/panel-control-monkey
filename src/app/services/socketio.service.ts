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
      url: 'http://localhost:3001',
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
  };

  emitEvento = (payload: any) => {
    console.log(payload.video);
    this.ioSocket.emit('video', payload);
  };
}
