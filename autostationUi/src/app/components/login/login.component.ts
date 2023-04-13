import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageConstants, SitePath } from 'src/app/common/constants';
import { Roles } from 'src/app/models/roles.enum';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formLogin = new FormGroup( {
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),    
  })

  constructor(private _userService: UserService,
    private router: Router) {}

  ngOnInit() {
    
  }

  submit() {
    let user: User = {
      username: this.formLogin.get('username')?.value?.toString(),
      password: this.formLogin.get('password')?.value?.toString()
    }
    this._userService.login(user);
  }
}
