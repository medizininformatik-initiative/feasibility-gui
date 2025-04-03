export const BasePaths = {
  feasibilityQuery: 'feasibility-query',
  dataSelection: 'data-selection',
  dataQuery: 'data-query',
  savedQueries: 'saved-queries',
  options: 'options',
  queryEditor: 'query-editor',
};

export const PathSegments = {
  search: 'search',
  editor: 'editor',
  result: 'result',
  cohortDefinition: 'cohort-definition',
  dataSelection: 'data-selection',
  criteria: 'criteria',
  feature: 'feature',
};

export const UrlPaths = {
  feasibilityQuery: {
    result: `${BasePaths.feasibilityQuery}/${PathSegments.result}`,
    editor: `${BasePaths.feasibilityQuery}/${PathSegments.editor}`,
    search: `${BasePaths.feasibilityQuery}/${PathSegments.search}`,
  },
  dataSelection: {
    editor: `${BasePaths.dataSelection}/${PathSegments.editor}`,
    search: `${BasePaths.dataSelection}/${PathSegments.search}`,
  },
  dataQuery: {
    cohortDefinition: `${BasePaths.dataQuery}/${PathSegments.cohortDefinition}`,
    dataSelection: `${BasePaths.dataQuery}/${PathSegments.dataSelection}`,
  },
  queryEditor: {
    criteria: `${BasePaths.queryEditor}/${PathSegments.criteria}`,
    feature: `${BasePaths.queryEditor}/${PathSegments.feature}`,
  },
};
