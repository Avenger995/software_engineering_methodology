import { Inject, Injectable } from '@angular/core';
import { HttpMethod } from 'src/app/utils/http-method';
import { ErrorHandlerDescriptor } from './error-handler-descriptor';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
    error$ = new Subject<string>()

  constructor(
    @Inject(ErrorHandlerDescriptor) private readonly handlers: Array<ErrorHandlerDescriptor>
  ) { }

  handle(httpErrorCode: number, httpMethod: HttpMethod, apiRoute: string) {
    const handlers = this.handlers.filter(h => {
        return (!h.httpErrorCode || h.httpErrorCode === httpErrorCode)
            && (!h.httpMethod || h.httpMethod === httpMethod)
            && this.getIsApiRouteMatch(h.apiRoute, apiRoute);
    });
    const result = handlers.map(item => item.handler.handle(httpErrorCode, httpMethod, apiRoute));
    
    }

    handleError(error: HttpErrorResponse) {
        this.error$.next(error.message);
    }

    clear() {
        this.error$.next('');
    }

    private getIsApiRouteMatch(template?: string, route?: string) {
        if (!template) {
            return true;
        }

        if (!route) {
            return false;
        }

        const normalizedRoute = (route.endsWith('/')
            ? route.substr(0, route.length - 1)
            : route).toLocaleLowerCase();

        if (template.indexOf('*') === -1) {
            return template === route;
        }

        const templateSegments = template.split('/');
        const routeSegments = normalizedRoute.split('/');

        return templateSegments.length === routeSegments.length
            && templateSegments.every((v, i) => v === '*' || v === routeSegments[i]);
    }
}
