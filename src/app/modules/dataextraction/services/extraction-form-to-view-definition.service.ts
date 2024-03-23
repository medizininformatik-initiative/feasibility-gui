import { Injectable } from '@angular/core';
import {
  SelectBackBoneElement,
  ViewDefinition,
  WhereBackBoneElement,
} from '../models/view-defintion.model';

@Injectable({
  providedIn: 'root',
})
export class ExtractionFormToViewDefinitionService {
  transformToViewDefinitions(form: any[]): ViewDefinition[] {
    return form.map((entry) => this.mapFormEntryToViewDefinition(entry));
  }

  private mapFormEntryToViewDefinition(formEntry: any): ViewDefinition {
    return {
      name: 'test',
      resourceType: 'http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition',
      resource: formEntry.ressource,
      status: 'active',
      date: new Date().toISOString(),
      fhirVersion: '4.0.1',
      select: this.mapSelectionToSelect(formEntry.selection.column),
      where: this.mapConditionsToWhere(formEntry.where),
    };
  }

  private mapSelectionToSelect(selection: any[]): SelectBackBoneElement[] {
    return selection
      .filter((col) => col.selected)
      .map((col) => ({
        column: [{ name: col.name, path: col.path }],
      }));
  }

  private mapConditionsToWhere(conditions: any[] = []): WhereBackBoneElement[] {
    const where = conditions
      .map((condition) => this.mapConditionToWhereClause(condition))
      .filter((clause) => clause !== null);
    return where.length > 0 ? where : [];
  }

  private mapConditionToWhereClause(condition: any): WhereBackBoneElement | null {
    let path = '';
    if (condition.type === 'coding') {
      path = this.constructCodingPath(condition);
    } else if (condition.type === 'date') {
      path = this.constructDatePath(condition);
    } else {
      path = null;
    }
    return path ? { path } : null;
  }

  private constructCodingPath(condition: any): string {
    return condition.value
      .map((code: any) => `${condition.path}.subsumedBy(${code.system}|${code.code}).anyTrue()`)
      .join(' or ');
  }

  private constructDatePath(condition: any): string {
    const afterDate = condition.afterDate
      ? this.isoDateTimeToFHIRPathDateTime(condition.afterDate.toISOString())
      : null;
    const beforeDate = condition.beforeDate
      ? this.isoDateTimeToFHIRPathDateTime(condition.beforeDate.toISOString())
      : null;
    if (!afterDate && !beforeDate) {return '';}
    if (afterDate && beforeDate)
      {return `${condition.path} >= ${afterDate} and ${condition.path} <= ${beforeDate}`;}
    if (afterDate) {return `${condition.path} >= ${afterDate}`;}
    return `${condition.path} <= ${beforeDate}`;
  }

  private isoDateTimeToFHIRPathDateTime(isoDateTime: string): string {
    return `@${isoDateTime}`;
  }
}
