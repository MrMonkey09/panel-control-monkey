import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const ComponentsList = [LoginComponent, NavbarComponent];
const ImportsList = [CommonModule, FormsModule];

@NgModule({
  declarations: ComponentsList,
  imports: ImportsList,
  exports: ComponentsList,
})
export class SharedModule {}
