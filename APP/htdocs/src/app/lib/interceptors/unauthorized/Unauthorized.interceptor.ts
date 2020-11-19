import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserService} from '../../../services/user/user.service';

export interface ParsedError {
  message: string;
  status?: number;
  stack?: string;
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorParsed: ParsedError = this.parse(error);
        if (error.status === 401) {
          this.userService.logout();
          this.router.navigate(['/login'])
        }
        return throwError(error);
      }));
  }

  parse(error: any): ParsedError {
    const parsedError: ParsedError = {
      message: error.message ? error.message as string : error.toString(),
    };
    if (error.status != null) {
      parsedError.status = error.status;
    }
    if (error.stack != null) {
      parsedError.stack = error.stack;
    }

    return parsedError;
  }
}
