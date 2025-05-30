import { BasePaths, PathSegments } from '../../../src/app/app-paths'

export const NavItem = {
  cohort: 'Cohort Selection',
  dataSelection: 'Data Selection',
  dataDefinition: 'Data Definition',
  settings: '.settings-link',
  profile: '.profile-link',
  logout: '.logout-link',
} as const

export type NavItemKey = keyof typeof NavItem

export type NavItemValue = (typeof NavItem)[NavItemKey]

export const NavItemPaths = {
  [NavItem.cohort]: `${BasePaths.feasibilityQuery}/${PathSegments.search}`,
  [NavItem.dataSelection]: `${BasePaths.dataSelection}/${PathSegments.search}`,
  [NavItem.dataDefinition]: `${BasePaths.dataQuery}/${PathSegments.cohortDefinition}`,
  [NavItem.settings]: BasePaths.options,
} as const

export type NavItemPathKey = keyof typeof NavItemPaths
