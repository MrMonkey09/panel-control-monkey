import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  screenRes!: { width: number; height: number };
  env!: any;
  constructor() {
    this.env = environment;
  }
  ngOnInit(): void {
    console.log('App Component Cargado');
    this.screenRes = { width: window.innerWidth, height: window.innerHeight };
    console.log({ screenRes: this.screenRes });
  }
  title = 'administrador-pantallas';
}
