import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm!: FormGroup<any>;
hidePassword:boolean=true;

constructor(private fb:FormBuilder,
  private snackBar:MatSnackBar,
  private authService:AuthService,
  private router:Router
){}

ngOnInit():void {
  this.loginForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,Validators.required]
  })
}

togglePasswordVisibility():void{
 this.hidePassword = !this.hidePassword;
} 

onSubmit():void {
 const username = this.loginForm?.get('email')?.value;
 const password = this.loginForm?.get('password')?.value;

 this.authService.login(username,password).subscribe(
  (response)=>{
    this.snackBar.open('Login successful!','Ok',{duration:5000});
  },
  (err)=>{
  this.snackBar.open('Login Failed!','close',{duration:5000,panelClass:'error-snackbar'});
  }
 )
}



}
