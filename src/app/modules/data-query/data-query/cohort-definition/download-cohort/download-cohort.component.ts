import { Component } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveFileModalComponent } from '../../../../../shared/components/save-file-modal/save-file-modal.component';
import { SaveFileDataModal } from '../../../../../shared/models/SaveDataModal/SaveFileDataModal';

@Component({
  selector: 'num-download-cohort',
  templateUrl: './download-cohort.component.html',
  styleUrls: ['./download-cohort.component.scss'],
})
export class DownloadCohortComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveFileModalComponent, void>,
    private downloadCCDLService: DownloadCCDLService
  ) {}

  public saveCohort(data: SaveFileDataModal) {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile(data.title);
    this.doDiscard();
  }

  public doDiscard(): void {
    this.dialogRef.close();
  }
}
