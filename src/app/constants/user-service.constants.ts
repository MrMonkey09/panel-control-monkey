import { departments } from "../fake-data/departments";
import { users } from "../fake-data/users";
import { Department_ } from "../interfaces/department";
import { User_ } from "../interfaces/user";

export class _UserConstants {
  public user?: User_ | undefined;
  public recharge: boolean = false;
  public isUserPanelOpened: boolean = false;
  public isBackButtonEnabled: boolean = false;
  public isUserSelected: boolean = false;
  public isCreateUserOpened: boolean = false;
  public isDeleteUserOpened: boolean = false;
  public isUpdateUserOpened: boolean = false;
  public isPanelUsed: boolean = false;
  public usersList: Array<User_> = users;
  public contUsers: number = 1;
  public currentUser!: User_ | null;
  public departmentList: Array<Department_> = departments;
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
