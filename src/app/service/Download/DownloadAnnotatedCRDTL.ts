import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { AnnotatedStructuredQuery } from 'src/app/model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';

@Injectable({
  providedIn: 'root',
})
export class DownloadAnnotatedCRDTLService {
  constructor(private fileSaverService: FileSaverService) {}

  public downloadAnnoatedCRDTLAsFile(
    annotatedStructuredQuery: AnnotatedStructuredQuery,
    filename?: string
  ) {
    const fileData = this.createFileData(annotatedStructuredQuery);
    this.fileSaverService.save(fileData, this.createFilename(filename) + '.json');
  }

  private createFilename(fileName?: string): string {
    if (fileName?.length > 0) {
      return fileName;
    } else {
      const filename =
        'CCDL_' +
        new Date().toLocaleDateString('de-DE') +
        '_' +
        new Date().toLocaleTimeString('de-DE');
      return filename;
    }
  }

  private createFileData(annotatedStructuredQuery: AnnotatedStructuredQuery) {
    const queryString = JSON.stringify(annotatedStructuredQuery);
    return new Blob([queryString], { type: 'text/plain;charset=utf-8' });
  }
}
