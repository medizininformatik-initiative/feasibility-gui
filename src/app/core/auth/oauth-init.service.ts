import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/config/app-config.service';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { from, race, of, timer, Observable } from 'rxjs';
import { mapTo, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OAuthInitService {
  private readonly TERMINATION_TIMEOUT = 20_000;
  private readonly ERROR_INIT_FAIL = 'App was not able to initialize the authentication service';
  private readonly ERROR_TIMEOUT = `${this.ERROR_INIT_FAIL} after waiting for ${this.TERMINATION_TIMEOUT} ms`;
  private readonly ERROR_UNREACHABLE = `${this.ERROR_INIT_FAIL} while connecting to the authentication server`;

  private BASE_URL: string;
  private REALM: string;
  private CLIENT_ID: string;
  private AUTH_CONFIG: AuthConfig;

  constructor(private oauthService: OAuthService, private appConfig: AppConfigService) {}

  public initOAuth(): Observable<boolean> {
    this.initVariables();

    this.oauthService.configure(this.AUTH_CONFIG);

    const init$ = from(
      this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
        this.oauthService.setupAutomaticSilentRefresh();
      })
    ).pipe(
      map(() => true),
      catchError(() => of(false))
    );

    const timeout$ = timer(this.TERMINATION_TIMEOUT).pipe(
      mapTo(false),
      catchError(() => of(false))
    );

    return race([init$, timeout$]).pipe(catchError(() => of(false)));
  }

  private initVariables(): void {
    const config = this.appConfig.config.auth;
    this.BASE_URL = config.baseUrl;
    this.REALM = config.realm;
    this.CLIENT_ID = config.clientId;

    this.AUTH_CONFIG = {
      issuer: `${this.BASE_URL}/realms/${this.REALM}`,
      clientId: this.CLIENT_ID,
      responseType: 'code',
      redirectUri: window.location.origin + '/home',
      silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
      scope: 'openid profile email roles',
      useSilentRefresh: true,
      silentRefreshTimeout: 5000,
      timeoutFactor: 0.25,
      sessionChecksEnabled: true,
      clearHashAfterLogin: false,
      nonceStateSeparator: 'semicolon',
    };
  }
}
