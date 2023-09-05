import { Screen } from './screen';
import { Location } from './location';

export interface GroupScreen {
  id: number;
  name: string;
  location: Location;
  screenList: Array<Screen>;
}
