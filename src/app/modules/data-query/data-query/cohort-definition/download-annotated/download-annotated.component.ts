import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnnotatedStructuredQuery } from 'src/app/model/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { SaveQueryModalComponent } from 'src/app/modules/feasibility-query/components/result/save-dialog/save-dialog.component';
import { DownloadAnnotatedCRDTLService } from 'src/app/service/Download/DownloadAnnotatedCRDTL';

@Component({
  selector: 'num-download-annotated',
  templateUrl: './download-annotated.component.html',
  styleUrls: ['./download-annotated.component.scss'],
})
export class DownloadAnnotatedComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>,
    @Inject(MAT_DIALOG_DATA) public annotatedStructuredQuery: AnnotatedStructuredQuery,
    private downloadAnnotatedCRDTLService: DownloadAnnotatedCRDTLService
  ) {}

  public saveAnnotatedCohort(filename: string): void {
    this.downloadAnnotatedCRDTLService.downloadAnnoatedCRDTLAsFile(
      this.annotatedStructuredQuery,
      filename
    );
    this.doDiscard();
  }

  public doDiscard(): void {
    this.dialogRef.close();
  }
}
