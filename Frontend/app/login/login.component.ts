import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMessage: boolean;
  errorMessage: '';
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService) { 
   }
  

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.showErrorMessage = false;
  }

  login(){
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    this.loginService
      .loginUser(loginData).subscribe(()=>{
        this.router.navigate(['/home']);
      },err => {
        if (err && err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = err.message;
        }
        this.showErrorMessage = true;
      }
      );

  }

  clearError() {
    this.showErrorMessage = false;
  }

}
