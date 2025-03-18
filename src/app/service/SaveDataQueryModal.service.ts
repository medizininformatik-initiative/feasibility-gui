import { Injectable } from '@angular/core';
import { SaveDataModal } from '../shared/models/SaveDataModal/SaveDataModalInterface';
import { SavedDataQueryService } from './DataQuery/Persistence/SaveDataQuery.service';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(private saveDataQueryService: SavedDataQueryService) {}

  public saveDataQuery(data: SaveDataModal | null = null): void {
    this.createCRDTLService
      .createCRDTL(data.feasibilityQuery, data.dataSelection)
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
