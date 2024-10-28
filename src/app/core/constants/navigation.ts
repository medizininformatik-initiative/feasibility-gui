import INavItem from '../../layout/models/nav-item.interface';

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'data-query',
    roles: ['main'],
    icon: 'database',
    translationKey: 'NAVIGATION.DATAQUERY',
  },
  {
    routeTo: 'feasibility-query/search',
    roles: ['main'],
    icon: 'file',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: 'data-selection/search',
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
