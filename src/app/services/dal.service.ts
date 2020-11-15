import { Injectable } from '@angular/core';
import { DalServiceInterface } from './dal.service.interface';

@Injectable({
  providedIn: 'root'
})
export class DalService implements DalServiceInterface {

  constructor() { }
}
