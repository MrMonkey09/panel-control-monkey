/* export interface GroupScreen {
  id: number;
  name: string;
  location: Location;
  screens: Array<Screen>;
}
 */

import { GroupScreen } from '../interfaces/group-screen';
import { locations } from './locations';

export let groupScreenList: Array<GroupScreen> = [
  {
    id: 1,
    name: 'Railway',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 2,
    name: 'Jokers',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 3,
    name: 'Mesas de juego',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 4,
    name: 'Terraza',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 5,
    name: 'Menorca',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 6,
    name: 'BallRoom',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 7,
    name: 'Brac',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 8,
    name: 'Santorini',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 9,
    name: 'Capri',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
  {
    id: 10,
    name: 'Eventos',
    location: locations[0],
    currentVideo: '',
    isActive: false,
  },
];
