import { FormGroup, Validators , FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserService } from '../create-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  createUserForm: FormGroup;
  showErrorMessage: boolean;
  errorMessage: '';
  showRole= false ;
  isAdmin= false;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private createUserService: CreateUserService ) { }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      role: ['']
    },{validator: this.checkPassword});
    this.showErrorMessage = false;
    this.roleCheck();
  }

  createUser(){
    const name = this.createUserForm.get('name').value;
    const email = this.createUserForm.get('email').value;
    const password = this.createUserForm.get('password').value;
    const role = this.createUserForm.get('role').value || 'user';
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      role
    };

    this.createUserService.
      createUser(userData).subscribe(()=>{
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

  checkPassword(group: FormGroup){
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmpassword').value;

    return pass === confirmPass ? null : {notSame: true}
  }

  clearError() {
    this.showErrorMessage = false;
  }

  roleCheck(){
    let userRole = sessionStorage.getItem('role');
    if (userRole === 'superAdmin'){
      this.showRole = true;
    }
    if(userRole === 'superAdmin' || userRole == 'admin'){
      this.isAdmin = true;
    }

  }
}
