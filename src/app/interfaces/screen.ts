import { Location_ } from './location';
import { User_ } from './user';
import { Department_ } from './department';
import { GroupScreen_ } from './group-screen';

export interface Screen_ {
  id: number;
  ip?: string;
  currentGroup?: number;
  brand: string;
  location: Location_;
  department: Department_;
  manager: User_;
}
