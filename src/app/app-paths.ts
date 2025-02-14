export const BasePaths = {
  feasibilityQuery: 'feasibility-query',
  dataSelection: 'data-selection',
  dataQuery: 'data-query',
  savedQueries: 'saved-queries',
  options: 'options',
};

export const PathSegments = {
  search: 'search',
  editor: 'editor',
  result: 'result',
  cohortDefinition: 'cohort-definition',
  dataSelection: 'data-selection',
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
};
