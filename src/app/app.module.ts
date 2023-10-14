/* Utilidades */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { _ApiFetchConstants } from './constants/api-fetch.constants';
import { RouterCoreModule } from './modules/router-core/router-core.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterCoreModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
