import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { _ApiFetchConstants } from '../../../../constants/api-fetch.constants';
import { apiDepartment } from './department/department.api';
import { apiGroupScreen } from './group-screen/group-screen.api';
import { apiLocation } from './location/location.api';
import { apiScreen } from './screen/screen.api';
import { apiUser } from './user/user.api';
import { apiSharedApi } from './shared-api/shared-api.api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  _apiConstants: _ApiFetchConstants;
  apiSharedApi: apiSharedApi;
  apiDepartment: apiDepartment;
  apiGroupScreen: apiGroupScreen;
  apiLocation: apiLocation;
  apiScreen: apiScreen;
  apiUser: apiUser;

  constructor(private http: HttpClient) {
    this._apiConstants = new _ApiFetchConstants();
    this.apiSharedApi = new apiSharedApi(this.http, this._apiConstants);
    this.apiDepartment = new apiDepartment(this.http, this._apiConstants);
    this.apiGroupScreen = new apiGroupScreen(this.http, this._apiConstants);
    this.apiLocation = new apiLocation(this.http, this._apiConstants);
    this.apiScreen = new apiScreen(this.http, this._apiConstants);
    this.apiUser = new apiUser(this.http, this._apiConstants);
    console.log('ApiFetch Servicio Cargado');
  }
}
