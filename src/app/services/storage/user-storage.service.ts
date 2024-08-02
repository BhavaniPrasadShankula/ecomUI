import { Injectable } from '@angular/core';

const TOKEN='ecom-token';
const USER='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

 saveToken(token:string):void{
  window.localStorage.removeItem(TOKEN);
  window.localStorage.setItem(USER,token);
 }

 saveUser(user: any):void{
  window.localStorage.removeItem(USER);
  window.localStorage.setItem(TOKEN,JSON.stringify(user));
 }

}
