/* export interface Location {
    id: number,
    name: string,
} */

import { Location } from '../interfaces/location';

const location1: Location = {
  id: 0,
  name: 'Railway',
};
const location2: Location = {
  id: 1,
  name: 'Menorca',
};
const location3: Location = {
  id: 2,
  name: 'Jokers',
};
const location4: Location = {
  id: 3,
  name: 'Railway',
};
const location5: Location = {
  id: 4,
  name: 'Railway',
};
const location6: Location = {
  id: 5,
  name: 'BC',
};

export const locations: Array<Location> = [
  location1,
  location2,
  location3,
  location4,
  location5,
  location6,
];
