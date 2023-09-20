/* export interface GroupScreen {
  id: number;
  name: string;
  location: Location;
  screens: Array<Screen>;
}
 */

import { GroupScreen } from '../interfaces/group-screen';
import { locations } from './locations';
import { screens } from './screens';

const groupScreen1: GroupScreen = {
  id: 1,
  name: 'Railway',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen2: GroupScreen = {
  id: 2,
  name: 'Jokers',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen3: GroupScreen = {
  id: 3,
  name: 'Mesas de juego',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen4: GroupScreen = {
  id: 4,
  name: 'Terraza',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen5: GroupScreen = {
  id: 5,
  name: 'Menorca',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen6: GroupScreen = {
  id: 6,
  name: 'BallRoom',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen7: GroupScreen = {
  id: 7,
  name: 'Brac',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen8: GroupScreen = {
  id: 8,
  name: 'Santorini',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen9: GroupScreen = {
  id: 9,
  name: 'Capri',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};
const groupScreen10: GroupScreen = {
  id: 10,
  name: 'Eventos',
  location: locations[0],
  currentVideo: '',
  isActive: false,
};

export const groupScreenList: Array<GroupScreen> = [
  groupScreen1,
  groupScreen2,
  groupScreen3,
  groupScreen4,
  groupScreen5,
  groupScreen6,
  groupScreen7,
  groupScreen8,
  groupScreen9,
  groupScreen10,
  groupScreen8,
  groupScreen9,
  groupScreen10,
];
