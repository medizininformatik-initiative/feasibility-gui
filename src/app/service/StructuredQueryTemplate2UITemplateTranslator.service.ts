import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StructuredQuerySavedQuery } from '../model/SavedInquiry/StructuredQuery/StructuredQuerySavedQuery';
import { StructuredQueryTemplate } from '../model/SavedInquiry/StructuredQuery/StructuredQueryTemplate';
import { TerminologyCode } from '../model/terminology/Terminology';
import { UISavedQuery } from '../model/SavedInquiry/UI/UISavedQuery';
import { UITemplate } from '../model/SavedInquiry/UI/UITemplate';

@Injectable({
  providedIn: 'root',
})
export class StructuredQueryTemplate2UITemplateTranslatorService {
  constructor(private backend: BackendService) {}

  public getStructuredQueryTemplates(): Observable<UITemplate[]> {
    const uiTemplates: UITemplate[] = new Array<UITemplate>();
    this.backend.loadSavedTemplates(true).subscribe((structuredQueryTemplates) => {
      const sortedStructuredQueryTemplates =
        this.sortStructuredQueryTemplatesByDescendingId(structuredQueryTemplates);
      sortedStructuredQueryTemplates.forEach((structuredQueryTemplate) => {
        const translatedUITemplate =
          this.setFeasibilityQueryTemplateAttributes(structuredQueryTemplate);
        uiTemplates.push(translatedUITemplate);
      });
    });
    return of(uiTemplates);
  }

  private setFeasibilityQueryTemplateAttributes(
    structuredQueryTemplate: StructuredQueryTemplate
  ): UITemplate {
    const uiTemplate = new UITemplate();
    uiTemplate.comment = structuredQueryTemplate.comment;
    uiTemplate.content = structuredQueryTemplate.content;
    uiTemplate.createdBy = structuredQueryTemplate.createdBy;
    uiTemplate.id = structuredQueryTemplate.id;
    uiTemplate.invalidTerms = structuredQueryTemplate.invalidTerms;
    uiTemplate.label = structuredQueryTemplate.label;
    uiTemplate.lastModified = structuredQueryTemplate.lastModified;
    uiTemplate.isValid = this.setValidAttribute(structuredQueryTemplate.invalidTerms);
    return uiTemplate;
  }

  private sortStructuredQueryTemplatesByDescendingId(
    structuredQueryTemplates: StructuredQueryTemplate[]
  ): StructuredQueryTemplate[] {
    return structuredQueryTemplates.sort((a, b) => a.id - b.id);
  }

  private setValidAttribute(invalidTerms: Array<TerminologyCode>): boolean {
    return invalidTerms.length > 0 ? false : true;
  }

  public getSavedStructuredQuerySavedQueries() {
    const uiSavedQueries: UISavedQuery[] = new Array<UISavedQuery>();
    this.backend.loadSavedQueries().subscribe((structuredQuerySavedQueries) => {
      const sortedStructuredQuerySavedQueries = this.sortStructuredQuerySavedQueriesByDescendingId(
        structuredQuerySavedQueries
      );
      sortedStructuredQuerySavedQueries.forEach((structuredQuerySavedQuery) => {
        const uiSavedQuery = this.setUISavedQueryAttributes(structuredQuerySavedQuery);
        uiSavedQueries.push(uiSavedQuery);
      });
    });
    return of(uiSavedQueries);
  }

  private setUISavedQueryAttributes(
    structuredQuerySavedQuery: StructuredQuerySavedQuery
  ): UISavedQuery {
    const uiSavedQuery = new UISavedQuery();
    uiSavedQuery.comment = structuredQuerySavedQuery.comment;
    uiSavedQuery.content = structuredQuerySavedQuery.content;
    //uiSavedQuery.createdBy       = structuredQueryTemplate.createdBy;
    uiSavedQuery.id = structuredQuerySavedQuery.id;
    uiSavedQuery.invalidTerms = structuredQuerySavedQuery.invalidTerms;
    uiSavedQuery.label = structuredQuerySavedQuery.label;
    uiSavedQuery.lastModified = structuredQuerySavedQuery.lastModified;
    uiSavedQuery.isValid = this.setValidAttribute(structuredQuerySavedQuery.invalidTerms);
    return uiSavedQuery;
  }

  private sortStructuredQuerySavedQueriesByDescendingId(
    structuredQuerySavedQueries: StructuredQuerySavedQuery[]
  ): StructuredQuerySavedQuery[] {
    return structuredQuerySavedQueries.sort((a, b) => a.id - b.id);
  }
}
