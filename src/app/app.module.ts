/* Utilidades */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
/* import { _ApiFetchConstants } from './constants/api-fetch.constants';
import { RouterCoreModule } from './modules/router-core/router-core.module'; */
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, /* RouterCoreModule, */ HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
