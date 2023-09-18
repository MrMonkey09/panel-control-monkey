import { Injectable } from '@angular/core';
import { Screen } from '../interfaces/screen';
import { GroupScreen } from '../interfaces/group-screen';
import { screens } from '../fake-data/screens';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  avaibles = screens;
  currentGroup!: GroupScreen;
  selected!: Array<Screen>;
  constructor() {
    console.log(this.avaibles);
  }
}
