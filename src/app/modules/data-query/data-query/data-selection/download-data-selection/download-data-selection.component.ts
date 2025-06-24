import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { SaveFileDataModal } from '../../../../../shared/models/SaveDataModal/SaveFileDataModal';

@Component({
  selector: 'num-download-data-selection',
  templateUrl: './download-data-selection.component.html',
  styleUrls: ['./download-data-selection.component.scss'],
})
export class DownloadDataSelectionComponent {
  constructor(
    private dialogRef: MatDialogRef<DownloadDataSelectionComponent, boolean>,
    private downloadCRDTLService: DownloadCRDTLService
  ) {}

  public saveDataSelection(data: SaveFileDataModal) {
    this.downloadCRDTLService.downloadActiveDataSelectionAsFile(data.title);
    this.doDiscard(false);
  }

  public doDiscard(isCancelled: boolean): void {
    console.log('Discarding download data selection', isCancelled);
    this.dialogRef.close(isCancelled);
  }
}
