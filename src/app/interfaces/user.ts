import { Department_ } from './department';

export interface User_ {
  id: number;
  name: string;
  password: string;
  email: string;
  department: Department_;
  rut: string;
}
