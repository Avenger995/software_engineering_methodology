import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { ApiPath, LocalStorageConstants } from '../../common/constants';
import { CrudService } from '../crud/crud.service';
import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;

 
  // сообщения об ошибках авторизации
  public errors: any = [];

  constructor(private crudService: CrudService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  
  // используем http.post() для получения токена
  public login(user: User) {
    this.crudService.postToken(ApiPath.Token, JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.uploadData(data);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  // обновление JWT токена
  public refreshToken() {
    let refresh = localStorage.getItem(LocalStorageConstants.Token);
    if (refresh == null) {
      this.errors = 'Unhandled error';
    } else {
      let token = JSON.parse(refresh.valueOf());
      token = {
        'refresh': token.refresh
      };
      this.crudService.postToken(ApiPath.RefreashToken, JSON.stringify(token), this.httpOptions).subscribe(
        data => {
          this.updateData(data);
        },
        err => {
          this.errors = err['error'];
        }
      );
    }
  }
 
  public logout() {
    localStorage.removeItem(LocalStorageConstants.Token);
  }
 
  private uploadData(token: Token) {
    localStorage.setItem(LocalStorageConstants.Token, JSON.stringify(token));
  }

  private updateData(token: Token) {
    let storage = JSON.parse(localStorage.getItem(LocalStorageConstants.Token)?.valueOf() as string);
    storage['access'] = token.access;
    localStorage.setItem(LocalStorageConstants.Token, JSON.stringify(storage));
  }

}
