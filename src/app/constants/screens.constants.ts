import { GroupScreen_ } from 'src/app/interfaces/group-screen';
import { Location_ } from 'src/app/interfaces/location';
import { Screen_ } from 'src/app/interfaces/screen';

class _ScreensConstants {
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

  currentGroup!: GroupScreen_;
  currentScreen!: Screen_;
  currentScreenInQueue!: any;
  currentVideo!: string;
  screenDetectedCount: number = 0;

  groupFormTemp = {
    Name: '',
  };
  screenDetectedForm = {
    Brand: '',
    LocationID: 0,
    DepartmentID: 0,
  };
}

export let _scrnConstants = new _ScreensConstants();
