import { Token } from '@angular/compiler';
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
  window.localStorage.setItem(TOKEN,token);
 }

 saveUser(user: any):void{
  window.localStorage.removeItem(USER);
  window.localStorage.setItem(USER,JSON.stringify(user));
 }

 static getToken():string{
   return window.localStorage.getItem(TOKEN);
 }

 static getUser():any{
  return JSON.parse(window.localStorage.getItem(USER));
}

 static getUserId():any{
  const user = this.getUser();
  if(null==user)
    return '';
  return user.userId;

 }

 static getUserRole():any{
  const user = this.getUser();
  if(null==user)
    return '';
  return user.role;
 }

 static isAdminLoggedIn():boolean {
   if(this.getToken() === null) {
    return false;
   }
   return this.getUserRole() === 'ADMIN';

 }

 static isCustomerLoggedIn():boolean {
  if(this.getToken() === null) {
   return false;
  }
  return this.getUserRole() === 'CUSTOMER';

}

static signOut() {
  window.localStorage.removeItem(USER);
  window.localStorage.removeItem(TOKEN);
}



}
