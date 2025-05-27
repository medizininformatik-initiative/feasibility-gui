import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { from, race, of, timer, Observable, throwError } from 'rxjs';
import { catchError, mapTo, map } from 'rxjs/operators';
import { IAppConfig } from 'src/app/config/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class OAuthInitService {
  private readonly TERMINATION_TIMEOUT = 20_000;

  private readonly ERROR_INIT_FAIL = 'App was not able to initialize the authentication service';
  private readonly ERROR_TIMEOUT = `${this.ERROR_INIT_FAIL} after waiting for ${this.TERMINATION_TIMEOUT} ms`;
  private readonly ERROR_UNREACHABLE = `${this.ERROR_INIT_FAIL} while connecting to the authentication server`;

  constructor(private oauthService: OAuthService) {}

  public initOAuth(config: IAppConfig): Observable<boolean> {
    this.buildAuthConfig(config);
    const timeout$ = this.setTimeoOut();
    const login$ = this.startOAuthLogin();
    return race([login$, timeout$]).pipe(
      catchError((err) => throwError(() => new Error(err.message || this.ERROR_INIT_FAIL)))
    );
  }

  private startOAuthLogin(): Observable<boolean> {
    const init$ = from(
      this.oauthService.loadDiscoveryDocumentAndLogin().then((loggedIn) => {
        if (loggedIn && this.oauthService.hasValidAccessToken()) {
          this.oauthService.setupAutomaticSilentRefresh();
          return true;
        } else {
          return false;
        }
      })
    ).pipe(
      catchError((err) => {
        console.error('OAuth init error:', err);
        return of(false);
      })
    );

    return init$;
  }

  private setTimeoOut(): Observable<boolean> {
    return timer(this.TERMINATION_TIMEOUT).pipe(
      mapTo(false),
      catchError(() => {
        console.error(this.ERROR_TIMEOUT);
        return of(false);
      })
    );
  }

  private buildAuthConfig(config: IAppConfig) {
    const BASE_URL = config.auth.baseUrl;
    const REALM = config.auth.realm;
    const CLIENT_ID = config.auth.clientId;

    const authConfig: AuthConfig = {
      issuer: `${BASE_URL}/realms/${REALM}`,
      clientId: CLIENT_ID,
      responseType: 'code',
      redirectUri: window.location.origin + '/home',
      silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
      scope: 'openid profile email roles',
      useSilentRefresh: true,
      silentRefreshTimeout: 52000,
      timeoutFactor: 0.25,
      sessionChecksEnabled: true,
      clearHashAfterLogin: false,
      nonceStateSeparator: 'semicolon',
    };
    this.oauthService.configure(authConfig);
  }
}
