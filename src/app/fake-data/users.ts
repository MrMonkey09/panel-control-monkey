/* export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  department: Department;
  rut: string;
  authenticated: boolean;
}
 */

import { User } from '../interfaces/user';
import { departments } from './departments';

let user1: User = {
  id: 0,
  name: 'Alfredo',
  password: 'ola123',
  email: 'alfredo@enjoy.cl',
  department: departments[0],
  rut: '20.399.817-1',
  authenticated: true,
};
let user2: User = {
  id: 0,
  name: 'Alfredo',
  password: 'ola123',
  email: 'gabriel@enjoy.cl',
  department: departments[0],
  rut: '20.399.817-1',
  authenticated: false,
};

export let users: Array<User> = [user1,user2];
