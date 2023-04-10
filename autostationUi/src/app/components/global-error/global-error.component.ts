import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handling/error-handler.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {

  constructor(public errorService: ErrorHandlerService) {}

  ngOnInit(): void {
    
  }
}
