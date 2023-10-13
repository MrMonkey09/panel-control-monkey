import { Screen_ } from './screen';

export interface GroupScreen_ {
  id: number;
  name: string;
  screenList?: Array<Screen_>;
  currentVideo: string;
  departament: number;
}
