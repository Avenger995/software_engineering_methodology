import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handling/error-handler.service';
import { Token } from 'src/app/models/token';
import { catchError } from 'rxjs/operators';
import { HttpMethod } from 'src/app/utils/http-method';
import { Observable } from 'rxjs';
import { Img } from 'src/app/models/img';
import { LocalStorageConstants } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  commonOption: any;

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly errorHandlerService: ErrorHandlerService) { 
    this.commonOption = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  postToken(apiUrl: string, item: string, httpOptions: any): Observable<Token> {
    return this.httpClient
            .post<Token>(this.getAbsoluteUrl(apiUrl), item, httpOptions)
            .pipe(catchError(this.getErrorHandler('post', apiUrl).bind(this)));
  }

  getAll<T>(apiUrl: string): Observable<Array<T>> {
    return this.httpClient.get<Array<T>>(this.getAbsoluteUrl(apiUrl), this.commonOption)
            .pipe(catchError(this.getErrorHandler<Array<T>>('get', apiUrl).bind(this)))
  }

  getByDate<T>(apiUrl: string, date: string): Observable<Array<T>> {
    return this.httpClient.get<Array<T>>(this.getAbsoluteUrl(apiUrl, date), this.commonOption)
            .pipe(catchError(this.getErrorHandler<Array<T>>('get', apiUrl).bind(this)))
  }

  getQr(apiUrl: string, cost: string): Observable<Img> {
    return this.httpClient.get<Img>(this.getAbsoluteUrl(apiUrl, cost), this.commonOption)
            .pipe(catchError(this.getErrorHandler<Img>('get', apiUrl).bind(this)))
  }

  post<TIn, TOut>(apiUrl: string, item: TIn): Observable<TOut> {
    return this.httpClient.post<TIn>(this.getAbsoluteUrl(apiUrl), item, this.getAccess())
              .pipe(catchError(this.getErrorHandler<TIn>('post', apiUrl).bind(this)));
  }

  update<TIn, TOut>(apiUrl: string, id: string, item: TIn): Observable<TOut> {
    return this.httpClient.put<TIn>(this.getAbsoluteUrl(apiUrl, id), item, this.getAccess())
            .pipe(catchError(this.getErrorHandler<TIn>('put', apiUrl).bind(this)));
  }

  delete<T>(apiUrl: string, id: number | string): Observable<T> {
    return this.httpClient.delete<T>(this.getAbsoluteUrl(apiUrl, id), this.getAccess())
            .pipe(catchError(this.getErrorHandler<T>('delete', apiUrl).bind(this)));
  }

  getAccess(): any {
    let access = JSON.parse(localStorage.getItem(LocalStorageConstants.Token) as string)['access'];
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + access})
    };
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
    return `${apiUrl}${id ? '/' + id + '/' : '/'}`;
  }
}
