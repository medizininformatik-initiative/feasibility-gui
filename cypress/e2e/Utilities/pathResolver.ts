import { UrlPaths } from "../../support/e2e";

export function getUrlPathByLabel(label: string): string | undefined {
  switch (label) {
    case 'Feasibility Editor':
      return UrlPaths.feasibilityQuery.editor;
    case 'Feasibility Search':
      return UrlPaths.feasibilityQuery.search;
    case 'Feasibility Result':
      return UrlPaths.feasibilityQuery.result;
    case 'Data Selection Editor':
      return UrlPaths.dataSelection.editor;
    case 'Data Selection Search':
      return UrlPaths.dataSelection.search;
    case 'Data Query - Cohort Definition':
      return UrlPaths.dataQuery.cohortDefinition;
    case 'Data Query - Data Selection':
      return UrlPaths.dataQuery.dataSelection;
    case 'Query Editor - Criteria':
      return UrlPaths.queryEditor.criteria;
    case 'Query Editor - Profile':
      return UrlPaths.queryEditor.profile;
    default:
      console.warn(`No URL path mapped for label: "${label}"`);
      return undefined;
  }
}
