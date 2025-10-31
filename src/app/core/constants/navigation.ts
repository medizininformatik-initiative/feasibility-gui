import { BasePaths } from 'src/app/app-paths';
import INavItem from '../../layout/models/nav-item.interface';

export const mainNavItems: INavItem[] = [
  {
    routeTo: BasePaths.dataQuery,
    icon: 'database',
    translationKey: 'NAVIGATION.DATAQUERY',
  },
  {
    routeTo: BasePaths.feasibilityQuery,
    icon: 'file',
    translationKey: 'NAVIGATION.QUERYBUILDER_EDITOR',
  },
  {
    routeTo: BasePaths.dataSelection,
    icon: 'dna',
    translationKey: 'NAVIGATION.DATASELECTION',
  },
  {
    routeTo: BasePaths.savedQueries,
    icon: 'folder',
    translationKey: 'NAVIGATION.QUERYBUILDER_OVERVIEW',
  },
];
