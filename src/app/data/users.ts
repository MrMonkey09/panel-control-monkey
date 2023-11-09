/* export interface User_ {
  id: number;
  name: string;
  password: string;
  email: string;
  department: Department;
  rut: string;
}
 */

import { User_ } from '../interfaces/user';
import { departments } from './departments';

export let users: Array<User_> = [
  {
    id: 0,
    name: 'System',
    password: 'sopanto735',
    email: 'root',
    department: departments[0],
    rut: '00.000.000-0',
  },

];
