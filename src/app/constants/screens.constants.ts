import { GroupScreen_ } from '../interfaces/group-screen';
import { Location_ } from '../interfaces/location';
import { Screen_ } from '../interfaces/screen';

export class _ScreensConstants {
  screenList!: Array<Screen_>;
  avalaibles!: Array<Screen_>;
  selected!: Array<Screen_>;
  screensDetectedQueue!: Array<any>;

  groupsScreen!: Array<GroupScreen_>;
  activeGroupScreens!: Array<GroupScreen_>;
  
  locations!: Array<Location_>;

  isCurrentGroup: boolean = false;
  isActiveGroup!: boolean;
  isActive!: boolean;
  isCreateGroupOpened: boolean = false;
  isPanelScreenOpened: boolean = false;
  isPanelScreenUsed: boolean = false;
  isScreenActivatedOpened: boolean = false;
  isScreenModifiedOpened: boolean = false;
  isScreenDesactivatedOpened: boolean = false;
  isScreenInQueueSelected: boolean = false;

  currentGroup!: GroupScreen_ | undefined;
  contGroups: number = 0;
  currentScreen!: Screen_;
  currentScreenInQueue!: any;
  currentVideo!: string;
  screenDetectedCount: number = 0;

  groupFormTemp = {
    name: '',
  };
  screenDetectedForm = {
    brand: '',
    location: 0,
    department: 0,
  };
}
