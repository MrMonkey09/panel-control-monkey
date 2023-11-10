import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, AfterViewInit {
  screenRes!: { width: number; height: number };
  constructor(
    public cookieService: CookieService,
    public constants: ConstantsService,
    public scrnService: ScreensService,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    console.log('Home Component Cargado');
  }

  ngAfterViewInit(): void {}
}
