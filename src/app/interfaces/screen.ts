import { Location } from './location';
import { User } from './user';
import { Department } from './department';
import { GroupScreen } from './group-screen';

export interface Screen {
  id: number;
  ip?: string;
  currentGroup?: number|string;
  brand: string;
  location: Location;
  department: Department;
  manager: User;
}
