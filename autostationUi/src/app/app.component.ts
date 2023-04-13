import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from './models/user';
import { LocalStorageConstants, SitePath } from './common/constants';
import { Roles } from './models/roles.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'autostationUi';

  constructor(private _userService: UserService,
    private router: Router) {}

  ngOnInit(){
    if (this.isAuth) {
      if (this.isTicketBuyer) {
        this.router.navigate(['/'+SitePath.TicketBuyer]);
        return;
      }
    }
  }

  get isAuth() {
    return localStorage.getItem(LocalStorageConstants.Token);
  }

  get isTicketBuyer() {
     return Roles.TicketBuyer == JSON.parse(localStorage.getItem(LocalStorageConstants.Token) as string)['groups'][0]; 
  }
}