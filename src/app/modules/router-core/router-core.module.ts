import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import routesConfig from './routes';
import { _ApiFetchConstants } from 'src/app/constants/api-fetch.constants';
const _apiFetchConstants = new _ApiFetchConstants();
const config: SocketIoConfig = { url: _apiFetchConstants.urlApi, options: {} };

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routesConfig),
    SocketIoModule.forRoot(config),
  ],
  exports: [RouterModule],
})
export class RouterCoreModule {}
