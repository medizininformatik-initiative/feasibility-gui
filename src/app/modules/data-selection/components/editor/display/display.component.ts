import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { map, Observable, Subscription } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { ProfileProviderService } from '../../../services/ProfileProvider.service';

@Component({
  selector: 'num-display-data-selection',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayDataSelectionComponent implements OnInit, OnDestroy {
  @Input() isEditable: boolean;
  @Input() showActionBar;
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfile>>;

  saveDataQueryModalSubscription: Subscription;

  constructor(
    private navigationHelperService: NavigationHelperService,
    private saveDataQueryModalService: SaveDataQueryModalService,
    private terminologySystemProvider: TerminologySystemProvider
  ) {}

  ngOnDestroy() {
    this.saveDataQueryModalSubscription?.unsubscribe();
  }

  ngOnInit(): void {}

  public navigateToDataSelectionSearch(): void {
    this.navigationHelperService.navigateToDataSelectionSearch();
  }

  public navigateToDataRequestDataSelection(): void {
    this.navigationHelperService.navigateToDataQueryDataSelection();
  }

  public saveDataQuery(): void {
    this.saveDataQueryModalSubscription?.unsubscribe();
    this.saveDataQueryModalSubscription = this.saveDataQueryModalService
      .openSaveDataQueryModal()
      .subscribe();
  }
}
