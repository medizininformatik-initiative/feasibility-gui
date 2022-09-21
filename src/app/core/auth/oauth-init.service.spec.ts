import { OAuthService } from 'angular-oauth2-oidc'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OAuthInitService } from './oauth-init.service'

describe('OAuth Init Service', () => {
  let initService: OAuthInitService

  const authService = ({
    configure: () => {},
    loadDiscoveryDocument: jest.fn().mockImplementation(),
    tryLoginCodeFlow: jest.fn().mockImplementation(),
    silentRefresh: jest.fn().mockImplementation(),
    setupAutomaticSilentRefresh: () => {},
  } as unknown) as OAuthService

  const appConfig = {
    config: {
      auth: {
        baseUrl: 'localhost',
        clientId: 'test-app',
        realm: 'test-realm',
      },
    },
  } as AppConfigService

  beforeEach(() => {
    initService = new OAuthInitService(authService, appConfig)
  })

  it('should be created', () => {
    expect(initService).toBeTruthy()
  })

  describe('When OAuth Server gets initialized with success', () => {
    const authConfig = {
      issuer: `${appConfig.config.auth.baseUrl}/auth/realms/${appConfig.config.auth.realm}`,
      clientId: `${appConfig.config.auth.clientId}`,
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
    }

    it('Calls init on OAuth Server with correct config and options', async () => {
      jest.spyOn(authService, 'configure')
      jest.spyOn(authService, 'loadDiscoveryDocument').mockResolvedValue(undefined)
      jest.spyOn(authService, 'tryLoginCodeFlow').mockResolvedValue(undefined)
      jest.spyOn(authService, 'silentRefresh').mockResolvedValue(undefined)
      jest.spyOn(authService, 'setupAutomaticSilentRefresh')

      await initService.initOAuth()

      expect(authService.configure).toHaveBeenCalledWith(authConfig)
      expect(authService.loadDiscoveryDocument).toHaveBeenCalled()
      expect(authService.setupAutomaticSilentRefresh).toHaveBeenCalled()
    })
  })

  describe('When OAuth Server gets initialized with no success', () => {
    it('fails', async () => {
      jest.spyOn(authService, 'loadDiscoveryDocument').mockImplementation(() => {
        return Promise.reject()
      })

      initService.initOAuth().catch((error) => {
        expect(error).toBeDefined()
      })
    })
  })

  describe('When OAuth Server gets initialized with no success within more than 20 seconds', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('fails', async () => {
      jest.spyOn(authService, 'loadDiscoveryDocument').mockImplementation(() => {
        jest.advanceTimersByTime(25_000)
        return Promise.reject()
      })

      initService.initOAuth().catch((error) => {
        expect(error).toBeDefined()
      })
    })
  })
})
