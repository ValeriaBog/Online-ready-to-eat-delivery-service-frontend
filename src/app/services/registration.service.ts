import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registr} from "../shared/model/Registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {}

  sendUserData(data: Registr): Observable<any> {

    return this.httpClient.post('http://localhost:3000/registration', data)

  }

}
