import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
signUpForm!: FormGroup<any>;
hidePassword: any;

constructor(private fb:FormBuilder,
  private snackBar:MatSnackBar,
  private authService:AuthService,
  private router:Router
){}

ngOnInit():void {
  this.signUpForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    name:[null,Validators.required],
    password:[null,Validators.required],
    confirmPassword:[null,Validators.required]
  })
}

togglePasswordVisibility():void{
 this.hidePassword = !this.hidePassword;
} 

onSubmit():void {
 const password = this.signUpForm?.get('password')?.value;
 const confirmpassword = this.signUpForm?.get('confirmPassword')?.value;

 if(password != confirmpassword){
  this.snackBar.open('Password do not match!','close',{duration:5000,panelClass:'error-snackbar'});
  return;
 }

 this.authService.register(this.signUpForm.value).subscribe(
  (response)=>{
  this.snackBar.open('SignUp successful!','close',{duration:5000});
  this.router.navigateByUrl('/login');
  },
  (error)=>{
  this.snackBar.open('Sign up Failed!','close',{duration:5000,panelClass:'error-snackbar'});
  }
 )
}

}
