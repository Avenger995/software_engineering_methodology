import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { LocalStorageConstants, SitePath } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'autostationUi';

  constructor(private _userService: UserService) {}

  ngOnInit(){
    if (this.isAuth) {
      this._userService.redirectAsUser();
    }
  }

  get isAuth() {
    return localStorage.getItem(LocalStorageConstants.Token);
  }
}