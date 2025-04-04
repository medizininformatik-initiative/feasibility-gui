import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'num-result-action-bar',
  templateUrl: './result-action-bar.component.html',
  styleUrls: ['./result-action-bar.component.scss'],
})
export class ResultActionBarComponent implements OnInit, OnDestroy {
  @Input()
  hasQueryResult: boolean;

  saveDataQueryModalSubscription: Subscription;

  constructor(
    private navigationHelperService: NavigationHelperService,
    private downloadCCDLService: DownloadCCDLService,
    private saveDataQueryModalService: SaveDataQueryModalService,
    private feasibilityQueryProvider: FeasibilityQueryProviderService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.saveDataQueryModalSubscription?.unsubscribe();
  }

  public saveQuery() {
    this.saveDataQueryModalSubscription?.unsubscribe();
    this.saveDataQueryModalSubscription = this.saveDataQueryModalService
      .openSaveDataQueryModal()
      .subscribe();
  }

  public doDownloadQuery() {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }

  public editStage(): void {
    this.navigationHelperService.navigateToFeasibilityQueryEditor();
  }
}
