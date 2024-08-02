import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASE_URL="http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  login(username: string, password: string):any {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    const body = {username,password};

    return this.http.post(BASE_URL+"authenticate",body,{headers,observe:'response'}).pipe(
      map((res)=>{
        const token =res.headers.get('authorization').substring(7);
        const user = res.body;
        if(token&&user){
          this.storeService.saveToken(token);
          this.storeService.saveUser(user);
          return true;
        }
        return false;
      }

      )
    )
    
  }

  constructor(private http:HttpClient,
    private storeService:UserStorageService
  ) { }

  register(signUpRequest:any):Observable<any>{
    return this.http.post(BASE_URL+"sign-up",signUpRequest);
  }
}
