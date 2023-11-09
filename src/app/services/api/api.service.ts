import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _apiFetchConstants } from '../../constants/api-fetch.constants';
import { apiDepartment } from './department/department.api';
import { apiGroupScreen } from './group-screen/group-screen.api';
import { apiLocation } from './location/location.api';
import { apiScreen } from './screen/screen.api';
import { apiUser } from './user/user.api';
import { apiSharedApi } from './shared-api/shared-api.api';
import { ConstantsService } from '../constants.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiSharedApi: apiSharedApi;
  apiDepartment: apiDepartment;
  apiGroupScreen: apiGroupScreen;
  apiLocation: apiLocation;
  apiScreen: apiScreen;
  apiUser: apiUser;

  constructor(private http: HttpClient, public constants: ConstantsService) {
    this.apiSharedApi = new apiSharedApi(this.http);
    this.apiDepartment = new apiDepartment(this.http);
    this.apiGroupScreen = new apiGroupScreen(this.http);
    this.apiLocation = new apiLocation(this.http);
    this.apiScreen = new apiScreen(this.http);
    this.apiUser = new apiUser(this.http);
    console.log('ApiFetch Servicio Cargado');
  }
}
