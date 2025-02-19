import { CreateCRDTLService } from '../Translator/CRTDL/CreateCRDTL.service';
import { CRTDL } from 'src/app/model/CRTDL/DataExtraction/CRTDL';
import { DownloadDataSelectionComponent } from 'src/app/modules/data-query/data-selection/download-data-selection/download-data-selection.component';
import { FileSaverService } from 'ngx-filesaver';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadCRDTLService {
  private subscription: Subscription;

  constructor(
    private createCRDTLService: CreateCRDTLService,
    private fileSaverService: FileSaverService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  public downloadActiveDataSelectionAsFile(filename?: string) {
    this.subscription = this.createCRDTLService.createCRDTL().subscribe((crdtl) => {
      this.fileSaverService.save(
        this.createFileData(crdtl),
        this.createFilename(filename) + '.json'
      );
      this.subscription.unsubscribe();
    });
  }

  public openDownloadDialog(isCohortExistent: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    if (isCohortExistent) {
      this.dialog
        .open(DownloadDataSelectionComponent, dialogConfig)
        .afterClosed()
        .subscribe(() => {
          this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.DOWNLOAD');
        });
    } else {
      this.snackbarService.displayErrorMessageWithNoCode('DATAQUERY.DATASELECTION.ERROR.DOWNLOAD');
    }
  }

  private createFilename(fileName?: string): string {
    if (fileName?.length > 0) {
      return fileName;
    } else {
      const filename =
        'CRDTL_' +
        new Date().toLocaleDateString('de-DE') +
        '_' +
        new Date().toLocaleTimeString('de-DE');
      return filename;
    }
  }

  private createFileData(crdtl: CRTDL) {
    const crdtlString = JSON.stringify(crdtl);
    return new Blob([crdtlString], { type: 'text/plain;charset=utf-8' });
  }
}
