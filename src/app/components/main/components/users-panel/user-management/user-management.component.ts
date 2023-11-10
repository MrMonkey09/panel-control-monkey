import { Component, OnInit } from '@angular/core';
import { User_ } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  constructor(
    public userService: UserServiceService,
    public constants: ConstantsService,
    private api: ApiService
  ) {}
  ngOnInit(): void {}

  getUser(user: User_) {
    console.log('Obteniendo usuario...');
    console.log({ user });
    this.constants._userConstants.currentUser = user;
    this.constants._userConstants.userFormTemp = {
      name: user.Name,
      rut: user.Rut,
      email: user.Email,
      password: '',
      newPass: '',
      confirmPass: '',
      department: user.DepartmentID + 1,
    };
    this.constants._userConstants.isUserSelected = true;
  }

  deleteUser(user: User_) {
    console.log({ 'Eliminando usuario': user });
    const newList = this.constants._userConstants.usersList.filter(
      (userTemp) => userTemp.ID !== user.ID
    );
    this.api.apiUser.deleteUser(user.ID ? user.ID : -1).subscribe({
      next: (res) => {
        console.log({ resDelUser: res });
      },
      complete: () => {
        console.log({
          oldList: this.constants._userConstants.usersList,
          newList: newList,
        });
        this.constants._userConstants.usersList = newList;
      },
    });
  }
}
