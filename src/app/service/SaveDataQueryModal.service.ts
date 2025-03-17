import { CreateCRDTLService } from './Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from '../model/CRTDL/DataExtraction/CRTDL';
import { DataQueryApiService } from './Backend/Api/DataQueryApi.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryResult } from '../model/Result/QueryResult';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { SaveDataModal } from '../shared/models/SaveDataModal/SaveDataModalInterface';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(
    private createCRDTLService: CreateCRDTLService,
    private resultProvider: ResultProviderService,
    private dataQueryApiService: DataQueryApiService
  ) {}

  public saveDataQuery(data: SaveDataModal | null = null): void {
    this.createCRDTLService
      .createCRDTL()
      .pipe(switchMap((crtdl: CRTDL) => this.buildSavedDataQueryData(crtdl, data)))
      .subscribe((savedDataQueryData) => this.postDataQuery(savedDataQueryData));
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
