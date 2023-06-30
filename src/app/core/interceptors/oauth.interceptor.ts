import { Injectable } from '@angular/core';
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../components/snack-bar/snack-bar.component';

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
        console.log(error.error);
        if (error.status === 401) {
          if (req.url === 'http://localhost:8090/api/v1/query-handler/stored-query') {
            window.alert('User unauthorized');
          } else {
            this.oauthService.logOut();
          }
        }
        if (error.status === 200) {
          this.snackbar.displayErrorMessage(error.message);
        }
        if (error.status === 403) {
          if ('issues' in error.error) {
            if (error.error.issues.some((issue) => issue.code === 'FEAS-10001')) {
              this.snackbar.displayErrorMessage(this.snackbar.errorCodes['403_FEAS_10001']);
            }
          }
          if (error.error.issues.some((issue) => issue.code === 'FEAS-10002')) {
            this.snackbar.displayErrorMessage(this.snackbar.errorCodes['403_FEAS_10002']);
            console.log('too many requests');
          }
        }
        if (error.status === 404) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['404']);
        }
        if (error.status === 429) {
          this.snackbar.displayErrorMessage(this.snackbar.errorCodes['429']);
        }
        return throwError(error);
      })
    );
  }
}
