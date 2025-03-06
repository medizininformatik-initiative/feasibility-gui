import { DownloadCohortComponent } from '../modules/data-query/data-query/cohort-definition/download-cohort/download-cohort.component';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnnotatedStructuredQuery } from '../model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { DownloadAnnotatedCRDTLService } from './Download/DownloadAnnotatedCRDTL';
import { DownloadAnnotatedComponent } from '../modules/data-query/data-query/cohort-definition/download-annotated/download-annotated.component';

@Injectable({
  providedIn: 'root',
})
export class ValidationModalService {
  constructor(private dialog: MatDialog) {}

  openDonwloadModal(annotatedStructuredQuery: AnnotatedStructuredQuery) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = annotatedStructuredQuery;
    this.dialog.open(DownloadAnnotatedComponent, dialogConfig);
  }
}
