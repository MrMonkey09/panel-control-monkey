import { Screen_ } from "./screen";

export interface GroupScreen_ {
  ID?: number;
  Name: string;
  ScreenList?: Array<Screen_>;
  CurrentVideo: string;
  DepartmentID: number;
}
