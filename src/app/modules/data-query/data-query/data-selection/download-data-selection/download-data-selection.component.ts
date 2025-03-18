import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DownloadCRDTLService } from 'src/app/service/Download/DownloadCRDTL.service';
import { SaveFileModalComponent } from '../../../../../shared/components/save-file-modal/save-file-modal.component';
import { SaveFileDataModal } from '../../../../../shared/models/SaveDataModal/SaveFileDataModal';

@Component({
  selector: 'num-download-data-selection',
  templateUrl: './download-data-selection.component.html',
  styleUrls: ['./download-data-selection.component.scss'],
})
export class DownloadDataSelectionComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveFileModalComponent, void>,
    private downloadCRDTLService: DownloadCRDTLService
  ) {}

  public saveDataSelection(data: SaveFileDataModal) {
    this.downloadCRDTLService.downloadActiveDataSelectionAsFile(data.title);
    this.doDiscard();
  }

  public doDiscard(): void {
    this.dialogRef.close();
  }
}
