import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handling/error-handler.service';
import { Token } from 'src/app/models/token';
import { catchError } from 'rxjs/operators';
import { HttpMethod } from 'src/app/utils/http-method';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly errorHandlerService: ErrorHandlerService
  ) { }

  postToken(apiUrl: string, item: string, httpOptions: any): Observable<Token> {
    return this.httpClient
            .post<Token>(this.getAbsoluteUrl(apiUrl), item, httpOptions)
            .pipe(catchError(this.getErrorHandler('post', apiUrl).bind(this)));
  }

  protected getErrorHandler<T>(method: HttpMethod, apiUrl: string, result?: T)
    : (error: any | HttpResponse<T>) => Observable<any> {
    return (error: any | HttpResponse<T>) => {
        if (error instanceof HttpResponse) {
            this.errorHandlerService.handle(error.status, method, apiUrl);
        }
        if (error != undefined) {
          this.errorHandlerService.handleError(error)
        }
        throw result || error;
    };
  }

  protected getAbsoluteUrl(apiUrl: string, id?: number|string): string {
    return `${apiUrl}${id ? '/' + id : ''}`;
  }
}
