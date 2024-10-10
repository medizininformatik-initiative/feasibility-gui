import INavItem from '../../layout/models/nav-item.interface';

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    roles: ['main'],
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'data-query',
    roles: ['main'],
    icon: 'database',
    translationKey: 'NAVIGATION.DATAQUERY',
  },
  {
    routeTo: 'querybuilder/editor',
    roles: ['main'],
    icon: 'file',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: 'data-selection',
    roles: ['main'],
    icon: 'dna',
    translationKey: 'NAVIGATION.DATASELECTION',
  },
  {
    routeTo: 'saved-queries',
    roles: ['main'],
    icon: 'folder',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
  {
    routeTo: 'options',
    roles: ['option'],
    icon: 'wrench',
    translationKey: 'NAVIGATION.OPTIONS',
  },
];

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
];
