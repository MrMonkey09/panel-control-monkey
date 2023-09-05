import { Department } from './department';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  department: Department;
  rut: string;
  authenticated: boolean;
}
