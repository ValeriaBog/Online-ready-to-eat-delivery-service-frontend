import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILogin} from "../shared/model/Login";
import {Observable} from "rxjs";
import {Registr} from "../shared/model/Registration";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user: Registr|null = null;
  private token!: string|null

  constructor(private httpClient: HttpClient) {
  }

  getUser(): Registr|null{
    return this.user;
    // возвращается user
  };
  sendUserDataForAuth(data: ILogin): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login/' + data.email, data)
  }

  setUser(user: Registr|null) {
    this.user = user;
    // записывается пользователь в this.user
  };

  setToken(token: string): void{
    this.token = token
    localStorage.setItem('userToken', token)
  }

  getToken(): string | null{
    return this.token || localStorage.getItem('userToken')
  }

  logOutPrivateAcc(){
    this.user = null;
    localStorage.removeItem('user')
  }


}
