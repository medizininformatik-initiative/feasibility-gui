import INavItem from '../../layout/models/nav-item.interface'

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'querybuilder-overview',
    roles: ['CODEX_DEVELOPER'],
    icon: 'dna',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
  {
    routeTo: 'querybuilder',
    icon: 'dna',
    translationKey: 'NAVIGATION.QUERYBUILDER',
  },
]

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]
