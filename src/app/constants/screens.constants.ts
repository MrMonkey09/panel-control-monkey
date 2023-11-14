import { GroupScreen_ } from '../interfaces/group-screen';
import { Location_ } from '../interfaces/location';
import { Screen_ } from '../interfaces/screen';

class _ScreensConstants {
  screenList: Array<Screen_> = [
    {
      ID: 1,
      IP: '192.168.0.24',
      Brand: 'LG',
      LocationID: 1,
      DepartmentID: 1,
      CurrentGroupID: 1,
    },
  ];
  avalaibles!: Array<Screen_>;
  selected!: Array<Screen_>;
  screensDetectedQueue: Array<any> = [{ ID: 1, IP: '172.28.21.20' }];

  groupsScreen: Array<GroupScreen_> = [
    {
      ID: 1,
      Name: 'asdasd',
      ScreenList: [
        {
          ID: 1,
          IP: '192.168.0.24',
          Brand: 'LG',
          LocationID: 1,
          DepartmentID: 1,
          CurrentGroupID: 1,
        },
      ],
      CurrentVideo: 'http://192.168.0.24:3001/1695587065346-promo-china.mp4',
      DepartmentID: 1,
    },
  ];
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
