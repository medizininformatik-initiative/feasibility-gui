import { Injectable } from '@angular/core';
import { EnterCriterionListComponent } from '../../modules/querybuilder/components/querybuilder-editor/edit/enter-criterion-list/enter-criterion-list.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export class EditCriterionService {
  constructor(public dialog: MatDialog) {}

  public editCriterion(): void {}

  private openDetailsPopUp(shouldAdd: boolean): void {
    /*  if (shouldAdd) {
      const terminologyEntries = this.extractSelectedEntries();

      if (terminologyEntries && terminologyEntries.length > 0) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          termEntryList: terminologyEntries,
          groupIndex: 0,
          critType: this.critType,
          query: this.query,
          searchType: this.searchType,
        };

        this.dialog.open(EnterCriterionListComponent, dialogConfig);
      }
    }
*/
    //this.closeOverlay.emit('tree');
  }
}
