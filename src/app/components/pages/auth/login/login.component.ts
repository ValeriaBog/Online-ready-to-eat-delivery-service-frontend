import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../../services/login.service";
import {ILogin} from "../../../../shared/model/Login";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  id!: string;
  email!: string;
  password!: string
  errors: { [key: string]: boolean } = {email: false}

  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [Validators.required,
          Validators.email]),
      password: new FormControl('',
        [Validators.required,
          Validators.max(25),
          Validators.min(5)])
    })
  }

  get fc() {
    return this.loginForm.controls;
  }

  submitLogin() {

    this.resetErrors();
    this.errors.email = this.loginForm.controls.email.errors?.required;
    this.errors.password = this.loginForm.controls.password.errors?.required;


    const userData: ILogin = {
      id: this.id,
      email: this.email,
      password: this.password
    }

    this.loginService.sendUserDataForAuth(userData).subscribe(
      (data) => {

        const userData = {
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          email: data.email
        }

        userData.id = data.id
        this.loginService.setUser(userData);
        const token: string = data.access_token;
        this.loginService.setToken(token);

        localStorage.setItem('user', JSON.stringify(userData));

        this.router.navigate(['account']);
      }, () => {
        this.messageService.add({severity: 'error', summary: "Почта или логин неверны"});
      }
    )
  }

  toRegistr() {
    this.router.navigate(['registr'])

  }

  resetErrors() {
    for (let prop in this.errors) {
      this.errors[prop] = false;
    }
  }

}
