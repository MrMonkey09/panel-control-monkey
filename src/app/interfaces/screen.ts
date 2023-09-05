import { Location } from './location';
import { User } from './user';
import { Department } from './department';

export interface Screen {
  id: number;
  brand: string;
  location: Location;
  department: Department;
  manager: User;
}
