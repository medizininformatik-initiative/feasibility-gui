import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { DataSelection2DataExtraction } from './DataSelection2DataExtraction.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UIQuery2StructuredQueryService } from '../StructureQuery/UIQuery2StructuredQuery.service';

@Injectable({
  providedIn: 'root',
})
export class CreateCRDTL {
  constructor(
    private dataExtractionTranslator: DataSelection2DataExtraction,
    private feasibilityQueryProvider: FeasibilityQueryProviderService,
    private uiQueryTranslator: UIQuery2StructuredQueryService
  ) {}

  public createCRDTL(): Observable<CRTDL> {
    return this.feasibilityQueryProvider
      .getFeasibilityQueryByID('1')
      .pipe(map((feasibilityQuery) => this.buildCRDTL(feasibilityQuery)));
  }

  private buildCRDTL(feasibilityQuery: Map<string, FeasibilityQuery>): CRTDL {
    const version = 'http://json-schema.org/to-be-done/schema#';
    const display = '';
    const cohortDefinition = this.uiQueryTranslator.translateToStructuredQuery(
      feasibilityQuery.get('1')
    );
    const dataExtraction = this.dataExtractionTranslator.translateToDataExtraction();
    return new CRTDL(display, version, cohortDefinition, dataExtraction);
  }
}
