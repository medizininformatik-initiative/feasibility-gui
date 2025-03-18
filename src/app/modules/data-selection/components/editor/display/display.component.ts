import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../../services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { map, Observable } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { SaveDataQueryModalService } from 'src/app/service/SaveDataQueryModal.service';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';

@Component({
  selector: 'num-display-data-selection',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayDataSelectionComponent implements OnInit {
  @Input() isEditable: boolean;
  @Input() showActionBar;
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfileProfile>>;

  constructor(
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private saveDataQueryModalService: SaveDataQueryModalService,
    private terminologySystemProvider: TerminologySystemProvider
  ) {}

  ngOnInit(): void {
    this.getDataSelectionProfiles();
  }

  /**
   * @todo add rerender of ui component
   */
  private getDataSelectionProfiles(): void {
    this.dataSelectionProvider
      .getActiveDataSelection()
      .pipe(
        map((dataSelection) =>
          dataSelection
            .getProfiles()
            .map((profile) =>
              this.dataSelectionProfileProvider.getDataSelectionProfileByUrl(profile.getUrl())
            )
        )
      )
      .subscribe();
  }

  public navigateToDataSelectionSearch(): void {
    this.navigationHelperService.navigateToDataSelectionSearch();
  }

  public navigateToDataRequestDataSelection(): void {
    this.navigationHelperService.navigateToDataQueryDataSelection();
  }

  public saveDataQuery(): void {
    this.saveDataQueryModalService.openSaveDataQueryModal();
  }
}
