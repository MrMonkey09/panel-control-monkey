/* export interface Screen {
  id: number;
  name: string;
  location: Location;
  department: Department;
  manager: User;
}
 */

import { Screen } from '../interfaces/screen';
import { departments } from './departments';
import { locations } from './locations';
import { users } from './users';

const screen1: Screen = {
  id: 0,
  brand: 'LG',
  location: locations[0],
  department: departments[0],
  manager: users[0],
};

export const screens: Array<Screen> = [screen1];
