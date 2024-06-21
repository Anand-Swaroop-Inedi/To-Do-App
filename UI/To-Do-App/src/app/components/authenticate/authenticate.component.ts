import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequiredErrorComponent } from '../../shared/Components/required-error/required-error.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RequiredErrorComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.scss'
})
export class AuthenticateComponent implements OnInit, AfterViewInit {
  @ViewChild('password') passwordRef!: ElementRef<HTMLInputElement>;
  @ViewChild('userName') userNameRef!: ElementRef<HTMLInputElement>;
  pageName: string = 'Sign Up';
  footerMsg: string = 'Already have an account? sign in';
  isSignUp: boolean = true;
  userForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isSubmitted: boolean = false;
  requiredMessage:string="This Field is Required";
  passwordErrorMessaage:string="Please ensure your password has at least 8 characters, including a capital letter, a lowercase letter, a digit, and a special symbol";
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    var pageName = this.router.url.split('/').pop();
    if (pageName && pageName == 'signup') {
      this.isSignUp = true;
    } else {
      this.isSignUp = false;
    }
    this.pageName = this.isSignUp ? 'Sign Up' : 'Sign In';
    this.footerMsg = this.isSignUp
      ? 'Already have an account? sign in'
      : "Don't have an account? Create";
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]),
    });
  }
  ngAfterViewInit(): void {
    this.passwordRef.nativeElement.placeholder = this.isSignUp
      ? 'Password'
      : 'Enter Your Password';
    this.userNameRef.nativeElement.placeholder = this.isSignUp
      ? 'Username'
      : 'Enter your username';
  }
  OnSubmit() {
    debugger
    this.isSubmitted = true;
    if (this.userForm.valid) {
      debugger;
      if (this.isSignUp) {
        this.userService.addUser(this.userForm.value).subscribe((response) => {
          if (response.statusCode == 200) {
            setTimeout(() => {
              this.userForm.reset();
              this.toaster.error('Sign in Now to view dashboard');
              this.navigate();
            }, 1000);
            this.toaster.success(response.message);
          } else {
            this.toaster.error(response.message);
          }
        });
      } else {
        this.userService
          .authenticateUser(this.userForm.value)
          .subscribe((response) => {
            if ((response.statusCode == 200)) {
              sessionStorage.setItem('Token', response.result);
              // var payload = response.result.split(".")[1];
              // payload = window.atob(payload);
              // console.log(JSON.parse(payload));
              setTimeout(() => {
                this.router.navigate(['home/dashboard']);
              }, 3000);
              this.toaster.success(response.message);
            } else {
              this.toaster.error(response.message);
            }
          });
      }
    }
  }
  navigate() {
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach((field) => {
      this.userForm.get(field)!.setErrors(null);
    });
    if (this.isSignUp) this.router.navigate(['/login']);
    else {
      this.router.navigate(['/signup']);
    }
  }
  makePasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordRef.nativeElement.type = this.isPasswordVisible
      ? 'text'
      : 'password';
  }
}
