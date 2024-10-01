import { FeasibilityQueryProviderService } from './Provider/FeasibilityQueryProvider.service';
import { FileSaverService } from 'ngx-filesaver';
import { Injectable } from '@angular/core';
import { UIQuery2StructuredQueryService } from './Translator/StructureQuery/UIQuery2StructuredQuery.service';
import { FeasibilityQuery } from '../model/FeasibilityQuery/FeasibilityQuery';

@Injectable({
  providedIn: 'root',
})
export class DownloadFeasibilityQueryService {
  constructor(
    private sqTranslatorService: UIQuery2StructuredQueryService,
    private fileSaverService: FileSaverService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService
  ) {}
  public downloadActiveFeasibilityQueryAsFile() {
    this.feasibilityQueryProviderService
      .getActiveFeasibilityQuery()
      .subscribe((feasibilityQuery) => {
        if (feasibilityQuery.getInclusionCriteria().length > 0) {
          this.fileSaverService.save(
            this.createFileData(feasibilityQuery),
            this.createFilename() + '.json'
          );
        }
      });
  }

  private createFilename(): string {
    const filename =
      'CCDL_' +
      new Date().toLocaleDateString('de-DE') +
      '_' +
      new Date().toLocaleTimeString('de-DE');
    return filename;
  }

  private createFileData(feasibilityQuery: FeasibilityQuery) {
    const queryString = JSON.stringify(
      this.sqTranslatorService.translateToStructuredQuery(feasibilityQuery)
    );
    return new Blob([queryString], { type: 'text/plain;charset=utf-8' });
  }
}
