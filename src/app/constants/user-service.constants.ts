import { Department_ } from 'src/app/interfaces/department';
import { User_ } from 'src/app/interfaces/user';

class _UserConstants {
  public departmentList!: Array<Department_>;
  public usersList!: Array<User_>;

  public user!: User_;
  public currentUser!: User_ | null;
  public depIndex!: number;

  public recharge: boolean = false;
  public isUserPanelOpened: boolean = false;
  public isBackButtonEnabled: boolean = false;
  public isUserSelected: boolean = false;
  public isCreateUserOpened: boolean = false;
  public isDeleteUserOpened: boolean = false;
  public isUpdateUserOpened: boolean = false;
  public isPanelUsed: boolean = false;
  
  public userFormTemp = {
    name: '',
    rut: '',
    email: '',
    password: '',
    newPass: '',
    confirmPass: '',
    department: 0,
  };
}

export let _userConstants = new _UserConstants();
