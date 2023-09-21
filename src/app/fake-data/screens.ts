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
  ip: '192.168.0.15',
  brand: 'LG',
  location: locations[5],
  department: departments[0],
  manager: users[0],
};
const screen2: Screen = {
  id: 1,
  brand: 'Polaroid',
  location: locations[1],
  department: departments[0],
  manager: users[0],
};
const screen3: Screen = {
  id: 2,
  brand: 'Sony',
  location: locations[3],
  department: departments[0],
  manager: users[0],
};
const screen4: Screen = {
  id: 3,
  brand: 'Sony',
  location: locations[3],
  department: departments[0],
  manager: users[0],
};
const screen5: Screen = {
  id: 4,
  brand: 'AOC',
  location: locations[3],
  department: departments[0],
  manager: users[0],
};
const screen6: Screen = {
  id: 5,
  brand: 'LG',
  location: locations[4],
  department: departments[0],
  manager: users[0],
};
const screen7: Screen = {
  id: 6,
  brand: 'Samsung',
  location: locations[2],
  department: departments[0],
  manager: users[0],
};

export const screens: Array<Screen> = [
  screen1,
  screen2,
  screen3,
  screen4,
  screen5,
  screen6,
  screen7,
];
