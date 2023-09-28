import { Screen } from './screen';

export interface GroupScreen {
  id: number;
  name: string;
  screenList?: Array<Screen>;
  currentVideo: string;
  departament: number;
}
