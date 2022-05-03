import INavItem from '../../layout/models/nav-item.interface'

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

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]
