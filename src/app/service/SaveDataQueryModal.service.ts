import { DataQueryStorageService } from './DataQuery/DataQueryStorage.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveDataQueryModalComponent } from '../shared/components/save-dataquery-modal/save-dataquery-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(private dialog: MatDialog, private dataQueryStorage: DataQueryStorageService) {}

  public openSaveDataQueryModal(): void {
    const dialogRef = this.dialog.open(SaveDataQueryModalComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataQueryStorage.saveDataQuery(data);
      }
    });
  }
}
