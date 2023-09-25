/* export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  department: Department;
  rut: string;
}
 */

import { User } from '../interfaces/user';
import { departments } from './departments';

export let users: Array<User> = [
  {
    id: 0,
    name: 'Alfredo',
    password: 'ola123',
    email: 'alfredo@enjoy.cl',
    department: departments[0],
    rut: '20.399.817-1',
  },
];
