import { Injectable } from '@angular/core';
import { LogServiceInterface } from './log.service.interface';

@Injectable({
  providedIn: 'root'
})
export class LogService implements LogServiceInterface {

  constructor() { }
  
  trace(msg: string, flush?: boolean, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  log(msg: string, flush?: boolean, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  alert(msg: string, flush?: boolean, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  error(msg: string, flush?: boolean, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  fatal(msg: string, flush?: boolean, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  flush() {
    throw new Error('Method not implemented.');
  }
}
