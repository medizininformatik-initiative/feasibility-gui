import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
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
export class OAuthInterceptor implements HttpInterceptor {
  excludedUrls = ['assets', '/assets'];
  excludedUrlsRegEx = this.excludedUrls.map((url) => new RegExp('^' + url, 'i'));

  constructor(
    private oauthService: OAuthService,
    private authStorage: OAuthStorage,
    private snackbar: SnackbarService
  ) {}

  private isExcluded(req: HttpRequest<any>): boolean {
    return this.excludedUrlsRegEx.some((toBeExcluded) => toBeExcluded.test(req.url));
  }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcluded(req)) {
      return next.handle(req);
    }
    const token = this.authStorage.getItem('access_token');
    const headers = req.headers.set('Authorization', 'Bearer ' + token);
    req = req.clone({ headers });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.oauthService.logOut();
        }
        if (error.status === 404) {
          this.handleErrorCodes(error.status);
        }
        if (error.error.issue) {
          this.handleErrorCodes(error.error.issue[0]?.code);
        }
        if (error.error.issues) {
          this.handleErrorCodes(error.error.issues[0]?.code, error.headers.get('Retry-After'));
        }
        return throwError(error);
      })
    );
  }

  public handleErrorCodes(errorCode, retryAfter?) {
    this.snackbar.displayErrorMessage(errorCode, retryAfter);
  }
}
