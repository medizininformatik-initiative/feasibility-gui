import INavItem from '../../layout/models/nav-item.interface'

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'querybuilder/editor',
    icon: 'dna',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: 'querybuilder/overview',
    roles: ['CODEX_USER'],
    icon: 'bars',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
]

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]
