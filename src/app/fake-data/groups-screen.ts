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
  id: 0,
  name: 'Railway',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen2: GroupScreen = {
  id: 0,
  name: 'Jokers',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen3: GroupScreen = {
  id: 0,
  name: 'Mesas de juego',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen4: GroupScreen = {
  id: 0,
  name: 'Terraza',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen5: GroupScreen = {
  id: 0,
  name: 'Menorca',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen6: GroupScreen = {
  id: 0,
  name: 'BallRoom',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen7: GroupScreen = {
  id: 0,
  name: 'Brac',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen8: GroupScreen = {
  id: 0,
  name: 'Santorini',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen9: GroupScreen = {
  id: 0,
  name: 'Capri',
  location: locations[0],
  screenList: [screens[0]],
};
const groupScreen10: GroupScreen = {
  id: 0,
  name: 'Eventos',
  location: locations[0],
  screenList: [screens[0]],
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
