import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from './models/user';
import { LocalStorageConstants } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'autostationUi';

  constructor(private _userService: UserService) {}

  ngOnInit(){
  }

  get isAuth() {
    return localStorage.getItem(LocalStorageConstants.Token);
  }
}