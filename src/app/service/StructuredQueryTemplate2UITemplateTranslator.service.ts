import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StructuredQuerySavedQuery } from '../model/SavedInquiry/StructuredQuery/StructuredQuerySavedQuery';
import { StructuredQueryTemplate } from '../model/SavedInquiry/StructuredQuery/StructuredQueryTemplate';
import { UISavedQuery } from '../model/SavedInquiry/UI/UISavedQuery';
import { UITemplate } from '../model/SavedInquiry/UI/UITemplate';
import { StructuredQueryCriterion } from '../model/StructuredQuery/Criterion/StructuredQueryCriterion';

@Injectable({
  providedIn: 'root',
})
export class StructuredQueryTemplate2UITemplateTranslatorService {
  constructor(private backend: BackendService) {}

  public getStructuredQueryTemplates(): Observable<UITemplate[]> {
    return this.backend
      .loadSavedTemplates()
      .pipe(
        map((structuredQueryTemplates: StructuredQueryTemplate[]) =>
          this.translateStructuredQueryTemplates(structuredQueryTemplates)
        )
      );
  }

  private translateStructuredQueryTemplates(
    structuredQueryTemplates: StructuredQueryTemplate[]
  ): UITemplate[] {
    const sortedTemplates = this.sortTemplatesByDescendingId(structuredQueryTemplates);
    return sortedTemplates.map((structuredQueryTemplate) =>
      this.setFeasibilityQueryTemplateAttributes(structuredQueryTemplate)
    );
  }

  private setFeasibilityQueryTemplateAttributes(
    structuredQueryTemplate: StructuredQueryTemplate
  ): UITemplate {
    const uiTemplate: UITemplate = new UITemplate(structuredQueryTemplate);
    const isValid: boolean = this.setValidAttribute(structuredQueryTemplate.invalidCriteria);
    uiTemplate.setAttributes(isValid, structuredQueryTemplate.createdBy);
    return uiTemplate;
  }

  public getSavedStructuredQuerySavedQueries(): Observable<UISavedQuery[]> {
    return this.backend
      .loadSavedQueries()
      .pipe(
        map((structuredQuerySavedQueries: StructuredQuerySavedQuery[]) =>
          this.translateStructuredQuerySavedQueries(structuredQuerySavedQueries)
        )
      );
  }

  private translateStructuredQuerySavedQueries(
    structuredQuerySavedQueries: StructuredQuerySavedQuery[]
  ): UISavedQuery[] {
    const sortedQueries = this.sortSavedQueriesByDescendingId(structuredQuerySavedQueries);
    return sortedQueries.map((structuredQuerySavedQuery) =>
      this.setUISavedQueryAttributes(structuredQuerySavedQuery)
    );
  }

  private setUISavedQueryAttributes(
    structuredQuerySavedQuery: StructuredQuerySavedQuery
  ): UISavedQuery {
    const uiSavedQuery: UISavedQuery = new UISavedQuery(structuredQuerySavedQuery);
    const isValid: boolean = this.setValidAttribute(structuredQuerySavedQuery.invalidCriteria);
    const totalNumberOfPatients: number = structuredQuerySavedQuery.totalNumberOfPatients;
    uiSavedQuery.setAttributes(isValid, totalNumberOfPatients);
    return uiSavedQuery;
  }

  private sortTemplatesByDescendingId(
    structuredQueryTemplates: StructuredQueryTemplate[]
  ): StructuredQueryTemplate[] {
    return structuredQueryTemplates.sort((a, b) => a.id - b.id);
  }

  private sortSavedQueriesByDescendingId(
    structuredQuerySavedQueries: StructuredQuerySavedQuery[]
  ): StructuredQuerySavedQuery[] {
    return structuredQuerySavedQueries.sort((a, b) => a.id - b.id);
  }

  private setValidAttribute(invalidCriteria: Array<StructuredQueryCriterion> = []): boolean {
    return invalidCriteria.length > 0 ? false : true;
  }
}
