import { Injectable } from '@angular/core';
import { _apiFetchConstants } from '../constants/api-fetch.constants';
import { _userConstants } from '../constants/user-service.constants';
import { _scrnConstants } from '../constants/screens.constants';
import { _videoConstants } from '../constants/video-management.constants';
import { _generalConstants } from '../constants/general.constants';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  _apiConstants = _apiFetchConstants
  _userConstants = _userConstants
  _scrnConstants = _scrnConstants
  _videoConstants = _videoConstants
  _generalConstants = _generalConstants

  constructor() { 
    console.log("Servicio de Constantes cargado...")
  }
}
