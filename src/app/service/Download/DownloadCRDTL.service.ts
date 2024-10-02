import { CreateCRDTLService } from '../Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { FileSaverService } from 'ngx-filesaver';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadCRDTLService {
  constructor(
    private createCRDTLService: CreateCRDTLService,
    private fileSaverService: FileSaverService
  ) {}

  public downloadActiveFeasibilityQueryAsFile(filename?: string) {
    this.createCRDTLService.createCRDTL().subscribe((crdtl) => {
      this.fileSaverService.save(this.createFileData(crdtl), this.createFilename() + '.json');
    });
  }

  private createFilename(): string {
    const filename =
      'CRDTL_' +
      new Date().toLocaleDateString('de-DE') +
      '_' +
      new Date().toLocaleTimeString('de-DE');
    return filename;
  }

  private createFileData(crdtl: CRTDL) {
    const crdtlString = JSON.stringify(crdtl);
    return new Blob([crdtlString], { type: 'text/plain;charset=utf-8' });
  }
}