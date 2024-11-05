import { Component } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveDataModal } from 'src/app/shared/models/SaveDataModal/SaveDataModalInterface';
import { SaveQueryModalComponent } from 'src/app/modules/feasibility-query/components/result/save-dialog/save-dialog.component';

@Component({
  selector: 'num-download-cohort',
  templateUrl: './download-cohort.component.html',
  styleUrls: ['./download-cohort.component.scss'],
})
export class DownloadCohortComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>,
    private downloadCCDLService: DownloadCCDLService
  ) {}

  public saveCohort(data: SaveDataModal) {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile(data.title);
    this.doDiscard();
  }

  public doDiscard(): void {
    this.dialogRef.close();
  }
}
