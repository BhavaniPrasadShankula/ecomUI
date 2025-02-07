import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eComUI';

  isCustomerLoggedIn:boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router:Router){

  }
  
  ngOnInit():void{
    this.router.events.subscribe(events=>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn= UserStorageService.isAdminLoggedIn(); 
    })

  }

  logOut():void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }



}
