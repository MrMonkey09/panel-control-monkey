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

export let screens: Array<Screen> = [
  {
    id: 0,
    ip: '172.28.20.20',
    brand: 'LG',
    location: locations[5],
    department: departments[1],
    manager: users[0],
  },
  {
    id: 1,
    ip: '192.168.0.12',
    brand: 'Polaroid',
    location: locations[1],
    department: departments[0],
    manager: users[0],
  },
  {
    id: 2,
    brand: 'Sony',
    ip: '172.28.23.53',
    location: locations[3],
    department: departments[1],
    manager: users[0],
  },
  {
    id: 3,
    brand: 'Sony',
    ip: '192.168.0.15',
    location: locations[3],
    department: departments[0],
    manager: users[0],
  },
  {
    id: 4,
    brand: 'AOC',
    ip: '172.28.63.187',
    location: locations[3],
    department: departments[1],
    manager: users[0],
  },
  {
    id: 5,
    brand: 'LG',
    ip: '172.28.63.144',
    location: locations[4],
    department: departments[1],
    manager: users[0],
  },
  {
    id: 6,
    brand: 'Samsung',
    ip: '195.64.25.0',
    location: locations[2],
    department: departments[0],
    manager: users[0],
  },
];
