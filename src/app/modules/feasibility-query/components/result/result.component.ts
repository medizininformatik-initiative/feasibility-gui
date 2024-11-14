import { Component, OnInit } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SaveQueryModalComponent } from './save-dialog/save-dialog.component';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'num-feasibility-query-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  resultLoaded = false;
  hasQueryResult: Observable<boolean>;
  constructor(
    private navigationHelperService: NavigationHelperService,
    private dialog: MatDialog,
    private downloadCCDLService: DownloadCCDLService,
    private feasibilityQueryProvider: FeasibilityQueryProviderService
  ) {}

  ngOnInit() {
    this.hasQueryResult = this.feasibilityQueryProvider.getHasQueryResult();
  }

  public editStage(): void {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }

  public saveQuery() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(SaveQueryModalComponent, dialogConfig);
  }

  public doDownloadQuery() {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }

  public setResultLoaded(value: boolean) {
    this.resultLoaded = value;
  }
}
