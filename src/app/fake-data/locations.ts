/* export interface Location {
    id: number,
    name: string,
} */

import { Location } from '../interfaces/location';

const location1: Location = {
  id: 0,
  name: 'Railway',
};

export const locations: Array<Location> = [location1];
