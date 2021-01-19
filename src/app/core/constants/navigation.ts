import INavItem from '../../layout/models/nav-item.interface'

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'querybuilder',
    icon: 'dna',
    translationKey: 'NAVIGATION.QUERYBUILDER',
    tabNav: [
      {
        routeTo: 'querybuilder/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
      },
      {
        routeTo: 'querybuilder/overview',
        id: 'overview',
        translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
      },
    ],
  },
]

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]
