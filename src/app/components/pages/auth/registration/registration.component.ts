import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../../services/registration.service";
import {Registr} from "../../../../shared/model/Registration";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../../shared/model/error";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  name!: string;
  lastName!: string;
  email!: string;
  password!: string
  registrForm!: FormGroup;
  user!: Registr;
  errors: { [key: string]: boolean } = {email: false}


  constructor(
    private router: Router,
    private registrService: RegistrationService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.registrForm = new FormGroup({
      name: new FormControl('',
        [Validators.required,
          Validators.max(15),
          Validators.min(2)]),
      lastName: new FormControl('',
        [Validators.required,
          Validators.min(1),
          Validators.max(15)]),
      email: new FormControl('',
        [Validators.required,
          Validators.email]),
      password: new FormControl('',
        [Validators.required,
          Validators.max(25),
          Validators.min(5)])
    })
  }

  // get fr() {
  //   return this.registrForm.controls;
  // }

  submitRegist() {

    this.resetErrors();
    this.errors.name = this.registrForm.controls.name.errors?.required;
    this.errors.lastName = this.registrForm.controls.lastName.errors?.required;
    this.errors.email = this.registrForm.controls.email.errors?.required;
    this.errors.password = this.registrForm.controls.password.errors?.required;

    // if(this.registrForm.invalid){ //???
    //   this.isSubmited=true;
    // }else{
    //}

    const userData: Registr = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password

    }
    console.log(userData)
// подписались на post-запрос на сервер
    this.registrService.sendUserData(userData).subscribe(
      (data) => {

        if (data) {// если юзер успешно добавился, то записываем в локалсторедж
          const objUserJsonStr = JSON.stringify(userData);
          localStorage.setItem('user_' + userData.email, objUserJsonStr);
          this.user = data
        }
        this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
      }, (err: HttpErrorResponse) => {
        const serverError = <ServerError>err.error
        this.messageService.add({severity: 'warn', summary: serverError.errorText});
      })
  }

  userData() {
    return this.user
    //{name: 'e', lastName: 'e', email: 'e', password: 'e', _id: '6492c802dc6062d9e38be5c8', _v:0}
    // объект , который приходит с сервера
  }

  toLogin() {
    this.router.navigate(['login'])
  }

  resetErrors() {
    for (let prop in this.errors) {
      this.errors[prop] = false;
    }
  }
}
