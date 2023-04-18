import { Component } from '@angular/core';
import { SitePath } from '../constants';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  home = SitePath.Operator;
  driver = SitePath.DriverEditor;
  bus = SitePath.BusEditor;
  voyage = SitePath.VoyageEditor;

  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigate(['/'+path]);
  }
}
