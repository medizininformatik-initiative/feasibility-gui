import { CreateCRDTLService } from '../../Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { DataQueryApiService } from '../../Backend/Api/DataQueryApi.service';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { QueryResult } from 'src/app/model/Result/QueryResult';
import { ResultProviderService } from '../../Provider/ResultProvider.service';
import { SaveDataModal } from '../../../shared/models/SaveDataModal/SaveDataModal';

@Injectable({
  providedIn: 'root',
})
export class SavedDataQueryService {
  constructor(
    private createCRDTLService: CreateCRDTLService,
    private resultProvider: ResultProviderService,
    private dataQueryApiService: DataQueryApiService
  ) {}

  public saveDataQuery(data: SaveDataModal | null = null): void {
    this.createCRDTLService
      .createCRDTLForSave(data?.feasibilityQuery, data?.dataSelection)
      .pipe(
        switchMap((crtdl: CRTDL) => this.buildSavedDataQueryData(crtdl, data)),
        take(1)
      )
      .subscribe(
        (savedDataQueryData) => {
          this.postDataQuery(savedDataQueryData);
        },
        (error) => console.error('Error saving data query:', error)
      );
  }

  private buildSavedDataQueryData(crtdl: CRTDL, data: SaveDataModal | null): Observable<any> {
    return this.getResultSize().pipe(
      map((result: QueryResult) => ({
        content: this.createCrtdlJson(crtdl),
        comment: data?.comment || '',
        label: data?.title || '',
        resultSize: result?.getTotalNumberOfPatients() ?? 0,
      }))
    );
  }

  private createCrtdlJson(crtdl: CRTDL) {
    return {
      display: crtdl.display,
      version: crtdl.version,
      cohortDefinition: crtdl.cohortDefinition,
      dataExtraction: crtdl.dataExtraction,
    };
  }

  private getResultSize(): Observable<QueryResult> {
    return this.resultProvider.getResultOfActiveFeasibilityQuery();
  }

  private postDataQuery(data: any): void {
    this.dataQueryApiService.postDataQuery(data).subscribe(
      (response) => console.log('Response:', response),
      (error) => console.error('Error posting data query:', error)
    );
  }
}
