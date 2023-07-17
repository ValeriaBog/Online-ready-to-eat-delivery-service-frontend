import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
// перехват каждого выполняемого HTTP-запроса
  //добавление настраиваемого HTTP-заголовка к окончательному исходящему запросу (например, добавление заголовка
  // авторизации и передача токена авторизации на всех конечных точках, требующих набора разрешений и т.д.),
  constructor(private loginService: LoginService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hasToken = this.loginService.getToken()
    if (hasToken) {
      console.log('has token', hasToken)

      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + hasToken)
      })
      return next.handle(cloned)

    } else {
      return next.handle(req)
    }

  }
}
