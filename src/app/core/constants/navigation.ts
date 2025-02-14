import { BasePaths } from 'src/app/app-paths';
import INavItem from '../../layout/models/nav-item.interface';

export const mainNavItems: INavItem[] = [
  {
    routeTo: BasePaths.dataQuery,
    roles: ['main'],
    icon: 'database',
    translationKey: 'NAVIGATION.DATAQUERY',
  },
  {
    routeTo: BasePaths.feasibilityQuery,
    roles: ['main'],
    icon: 'file',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: BasePaths.dataSelection,
    roles: ['main'],
    icon: 'dna',
    translationKey: 'NAVIGATION.DATASELECTION',
  },
  {
    routeTo: BasePaths.savedQueries,
    roles: ['main'],
    icon: 'folder',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
  {
    routeTo: BasePaths.options,
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
