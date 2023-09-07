import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/fake-data/users';
import { User } from 'src/app/interfaces/user';
import { ApiFecthService } from 'src/app/services/api-fecth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    pass: '',
  };

  datos: any[] = [];

  constructor(public api: ApiFecthService) {}

  ngOnInit(): void {
  }

  loggIn() {
    const findUser = users.filter(
      (user) => user.email.toLowerCase() === this.form.email.toLowerCase()
    );
    if (findUser.length > 0 && findUser.length < 2) {
      console.log('Usuario ' + findUser[0].email + ' encontrado...');
      if (
        findUser[0].email.toLowerCase() === this.form.email.toLowerCase() &&
        findUser[0].password === this.form.pass
      ) {
        findUser[0].authenticated = true;
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('Usuario no encontrado');
    }
    return;
  }
}
