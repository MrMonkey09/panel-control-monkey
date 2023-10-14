import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const ComponentsList = [LoginComponent, NavbarComponent];

@NgModule({
  declarations: ComponentsList,
  imports: [
    CommonModule,
    /* SharedRoutingModule */
  ],
  exports: ComponentsList,
})
export class SharedModule {}
