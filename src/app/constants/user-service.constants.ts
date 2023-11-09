import { Department_ } from '../interfaces/department';
import { User_ } from '../interfaces/user';

class _UserConstants {
  public user!: User_;
  public recharge: boolean = false;
  public isUserPanelOpened: boolean = false;
  public isBackButtonEnabled: boolean = false;
  public isUserSelected: boolean = false;
  public isCreateUserOpened: boolean = false;
  public isDeleteUserOpened: boolean = false;
  public isUpdateUserOpened: boolean = false;
  public isPanelUsed: boolean = false;
  public usersList!: Array<User_>;
  public contUsers: number = 1;
  public currentUser!: User_ | null;
  public departmentList!: Array<Department_>;
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

export let _userConstants = new _UserConstants()
