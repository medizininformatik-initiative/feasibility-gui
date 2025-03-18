import { CreateCRDTLService } from './Translator/CRTDL/CreateCRDTL.service';
import { DataQueryApiService } from './Backend/Api/DataQueryApi.service';
import { Injectable } from '@angular/core';
import { ResultProviderService } from './Provider/ResultProvider.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveDataQueryModalComponent } from '../shared/components/save-dataquery-modal/save-dataquery-modal.component';
import { DataQueryStorageService } from './DataQuery/DataQueryStorage.service';

@Injectable({
  providedIn: 'root',
})
export class SaveDataQueryModalService {
  constructor(
    private createCRDTLService: CreateCRDTLService,
    private resultProvider: ResultProviderService,
    private dataQueryApiService: DataQueryApiService,
    private dialog: MatDialog,
    private dataQueryStorage: DataQueryStorageService
  ) {}

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
