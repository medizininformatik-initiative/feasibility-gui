import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ErrorCodes, SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService, private snackbar: SnackbarService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.oauthService.logOut();
        }
        if (error.status === 404) {
          this.handleErrorCodes(error.status);
        }
        if (error.error?.issue) {
          this.handleErrorCodes(error.error.issue[0]?.code);
        }
        if (error.error?.issues) {
          const retryAfter = error.headers.get('Retry-After');
          this.handleErrorCodes(error.error.issues[0]?.code, Number(retryAfter));
        }
        return throwError(error);
      })
    );
  }

  public handleErrorCodes(errorCode, retryAfter?: number) {
    this.snackbar.displayErrorMessage(errorCode, retryAfter);
  }
}
