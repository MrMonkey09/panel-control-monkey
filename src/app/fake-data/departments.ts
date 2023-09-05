/* export interface Department {
  id: number;
  name: string;
  users: Array<User>;
}
 */

import { Department } from '../interfaces/department';
import { users } from './users';

const department1: Department = {
  id: 0,
  name: 'Marketing',
};

export const departments: Array<Department> = [department1];
