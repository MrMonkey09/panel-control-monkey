import { GroupScreen_ } from '../interfaces/group-screen';
import { locations } from '../data/locations';
import { Location_ } from '../interfaces/location';
import { Screen_ } from '../interfaces/screen';

export class _ScreensConstants {
  avalaibles!: Array<Screen_>;
  screensDetectedQueue!: Array<any>;
  locations: Array<Location_> = locations;
  currentGroup!: GroupScreen_ | undefined;
  contGroups: number = 0;
  selected: Array<Screen_> = [];
  currentScreen!: Screen_;
  currentScreenInQueue!: any;
  groupsScreen!: Array<GroupScreen_>;
  activeGroupScreens!: Array<GroupScreen_>;
  screenList?: Array<Screen_>;
  currentVideo!: string;
  groupFormTemp = {
    name: '',
  };
  screenDetectedForm = {
    brand: '',
    location: 0,
    department: 0,
  };
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
  screenDetectedCount: number = 0;
}
