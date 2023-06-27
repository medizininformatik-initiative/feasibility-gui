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
        console.log(error);
        if (error.status === 401) {
          if (req.url === 'http://localhost:8090/api/v1/query-handler/stored-query') {
            window.alert('User unauthorized');
          } else {
            this.oauthService.logOut();
          }
        }
        if (error.status === 404) {
          //window.alert('Site not found');
        }
        if (error.status === 429) {
          //window.alert('to many request');
        }
        this.snackbar.displayErrorMessage(error.message);
        return throwError(error);
      })
    );
  }
}
