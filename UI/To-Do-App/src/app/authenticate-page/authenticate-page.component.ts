import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticate-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './authenticate-page.component.html',
  styleUrl: './authenticate-page.component.scss'
})
export class AuthenticatePageComponent implements OnInit {
  @ViewChild('password') passwordRef!:ElementRef<HTMLInputElement>;
  @ViewChild('userName') userNameRef!:ElementRef<HTMLInputElement>;
  pageName:string="Sign Up";
  footerMsg:string="Already have an account? sign in";
  isSignUp:boolean=true;
  userForm!:FormGroup;
  isPasswordVisible:boolean=false;
  isSubmitted:boolean=false;
  ngOnInit()
  {
    this.userForm=new FormGroup({
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }
  OnSubmit()
  {
    this.isSubmitted=true;
    if(this.userForm.valid)
    console.log(this.userForm.value);
  }
  navigate()
  {
    this.isSignUp=!this.isSignUp;
    this.pageName=this.isSignUp?"Sign Up":"Sign In";
    this.footerMsg=this.isSignUp?"Already have an account? sign in":"Don't have an account? Create"
    this.passwordRef.nativeElement.placeholder=this.isSignUp?"Password":"Enter Your Password"
    this.userNameRef.nativeElement.placeholder=this.isSignUp?"Username":"Enter your username"
  }
  makePasswordVisible()
  {
    this.isPasswordVisible=!this.isPasswordVisible;
    this.passwordRef.nativeElement.type=this.isPasswordVisible?'text':'password';
    
  }
}
