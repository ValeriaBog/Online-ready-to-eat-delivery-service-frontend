import { Component,OnInit} from '@angular/core';
import {LoginService} from "../../../../services/login.service";
import {Registr} from "../../../../shared/model/Registration";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-private-account',
  templateUrl: './private-account.component.html',
  styleUrls: ['./private-account.component.css']
})
export class PrivateAccountComponent implements OnInit {

  user!: Registr;
  address!: string;
  userPhone!: number;
  userForm!: FormGroup;
  errors: { [key: string]: boolean } = {email: false}


  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) {
  }


  ngOnInit() {
    let user = localStorage.getItem('user');

    if (user != null) {
      this.user = JSON.parse(user)
    } else {
      return
    }

    this.userForm = new FormGroup({
      address: new FormControl('',
        [Validators.required,
          Validators.max(30),
          Validators.min(10)]),
      userPhone: new FormControl('',
        [Validators.required,
          Validators.min(10),
          Validators.max(30)])
    })

  }

  saveUserInfo() {

    this.resetErrors();
    this.errors.address = this.userForm.controls.address.errors?.required;
    this.errors.userPhone = this.userForm.controls.userPhone.errors?.required;

    const userInfo = {
      address: this.address,
      userPhone: this.userPhone
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    this.messageService.add({severity: 'success', summary: 'Сохранение успешно'});
  }

  resetErrors() {
    for (let prop in this.errors) {
      this.errors[prop] = false;
    }
  }


  logOut() {
    this.router.navigate(['login'])
    this.loginService.logOutPrivateAcc()
    localStorage.removeItem('userInfo')
  }

}
