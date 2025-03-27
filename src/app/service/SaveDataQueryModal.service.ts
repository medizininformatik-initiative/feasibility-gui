import { DataQueryStorageService } from './DataQuery/DataQueryStorage.service';
import { filter, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveDataQueryModalComponent } from '../shared/components/save-dataquery-modal/save-dataquery-modal.component';
import { SavedUsageStats } from '../model/Types/SavedUsageStats';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(private dialog: MatDialog, private dataQueryStorage: DataQueryStorageService) {}

  public openSaveDataQueryModal(): Observable<SavedUsageStats> {
    const dialogRef = this.dialog.open(SaveDataQueryModalComponent, {
      disableClose: true,
    });
    return dialogRef.afterClosed().pipe(
      filter((data) => !!data),
      switchMap((data) => this.dataQueryStorage.saveDataQuery(data))
    );
  }
}
