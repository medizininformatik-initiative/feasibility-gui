import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveQueryModalComponent } from 'src/app/modules/feasibility-query/components/result/save-dialog/save-dialog.component';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { SaveDataModal } from 'src/app/shared/models/SaveDataModal/SaveDataModalInterface';

@Component({
  selector: 'num-download-data-selection',
  templateUrl: './download-data-selection.component.html',
  styleUrls: ['./download-data-selection.component.scss'],
})
export class DownloadDataSelectionComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveQueryModalComponent, void>,
    private downloadCRDTLService: DownloadCRDTLService
  ) {}

  public saveDataSelection(data: SaveDataModal) {
    this.downloadCRDTLService.downloadActiveDataSelectionAsFile(data);
    this.doDiscard();
  }

  public doDiscard(): void {
    this.dialogRef.close();
  }
}
