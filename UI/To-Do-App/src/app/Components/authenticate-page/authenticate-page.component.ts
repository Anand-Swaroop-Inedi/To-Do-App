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
import { RequiredErrorComponent } from '../../Shared Scripts/Components/required-error/required-error.component';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authenticate-page',
  standalone: true,
  templateUrl: './authenticate-page.component.html',
  styleUrl: './authenticate-page.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RequiredErrorComponent],
})
export class AuthenticatePageComponent implements OnInit, AfterViewInit {
  @ViewChild('password') passwordRef!: ElementRef<HTMLInputElement>;
  @ViewChild('userName') userNameRef!: ElementRef<HTMLInputElement>;
  pageName: string = 'Sign Up';
  footerMsg: string = 'Already have an account? sign in';
  isSignUp: boolean = true;
  userForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isSubmitted: boolean = false;
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
      password: new FormControl('', [Validators.required]),
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
    this.isSubmitted = true;
    if (this.userForm.valid) {
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
            if ((response.statusCode = 200)) {
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
