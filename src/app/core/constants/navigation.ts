import INavItem from '../../layout/models/nav-item.interface'
import { inject, InjectionToken } from '@angular/core'
import { FeatureService } from '../../service/feature.service'
import { AppConfigService } from '../../config/app-config.service'
import { FeatureProviderService } from '../../modules/querybuilder/service/feature-provider.service'

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    roles: ['main'],
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'querybuilder/editor',
    roles: ['main'],
    icon: 'dna',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: 'querybuilder/overview',
    roles: ['main'],
    icon: 'bars',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
  {
    routeTo: 'options',
    roles: ['option'],
    icon: 'wrench',
    translationKey: 'NAVIGATION.OPTIONS',
  },
]

export const secondaryNavItemsLoggedIn: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]
export const secondaryNavItemsLoggedOut: INavItem[] = [
  {
    routeTo: '#login',
    icon: 'sign-in-alt',
    translationKey: 'NAVIGATION.SIGNIN',
  },
]
