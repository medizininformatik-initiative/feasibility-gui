import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { DataSelection2DataExtraction } from './DataSelection2DataExtraction.service';
import { FeasibilityQueryProviderService } from '../../Provider/FeasibilityQueryProvider.service';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { UIQuery2StructuredQueryService } from '../StructureQuery/UIQuery2StructuredQuery.service';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DataExtraction } from 'src/app/model/CRTDL/DataExtraction/DataExtraction';
import { ActiveDataSelectionService } from '../../Provider/ActiveDataSelection.service';

@Injectable({
  providedIn: 'root',
})
export class CreateCRDTLService {
  constructor(
    private dataExtractionTranslator: DataSelection2DataExtraction,
    private feasibilityQueryProvider: FeasibilityQueryProviderService,
    private uiQueryTranslator: UIQuery2StructuredQueryService,
    private dataSelectionProvider: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  public createCRDTL(): Observable<CRTDL> {
    return combineLatest([this.getStructuredQuery(), this.getDataExtraction()]).pipe(
      map(([structuredQuery, dataExtraction]) => this.buildCRDTL(structuredQuery, dataExtraction))
    );
  }

  private buildCRDTL(structuredQuery: StructuredQuery, dataExtraction: DataExtraction): CRTDL {
    const version = 'http://json-schema.org/to-be-done/schema#';
    const display = '';

    return new CRTDL(display, version, structuredQuery, dataExtraction);
  }

  private getStructuredQuery(): Observable<StructuredQuery> {
    return this.feasibilityQueryProvider
      .getActiveFeasibilityQuery()
      .pipe(
        map((feasibilityQuery) =>
          this.uiQueryTranslator.translateToStructuredQuery(feasibilityQuery)
        )
      );
  }

  private getDataExtraction(): Observable<DataExtraction> {
    const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionID();
    return this.dataSelectionProvider
      .getDataSelectionByUID(dataSelectionId)
      .pipe(
        map((dataSelection) =>
          this.dataExtractionTranslator.translateToDataExtraction(dataSelection)
        )
      );
  }
}
