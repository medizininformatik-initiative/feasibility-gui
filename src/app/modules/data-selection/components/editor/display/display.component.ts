import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../../services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { DownloadCRDTLService } from '../../../../../service/Download/DownloadCRDTL.service';
import { map, Observable } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

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
    private downloadCRDTLService: DownloadCRDTLService,
    private navigationHelperService: NavigationHelperService,
    private test1: TerminologySystemProvider
  ) {}

  ngOnInit(): void {
    this.getDataSelectionProfiles();
  }

  /**
   * @todo add rerender of ui component
   */
  private getDataSelectionProfiles(): void {
    this.$dataSelectionProfileArray = this.dataSelectionProvider
      .getActiveDataSelection()
      .pipe(
        map((dataSelection) =>
          dataSelection
            .getProfiles()
            .map((profile) =>
              this.dataSelectionProfileProvider.getDataSelectionProfileByUID(profile.getId())
            )
        )
      );
  }

  public downloadCRDTL(): void {
    this.downloadCRDTLService.downloadActiveFeasibilityQueryAsFile();
  }

  public navigateToDataSelectionSearch(): void {
    this.navigationHelperService.navigateToDataSelectionSearch();
  }

  public navigateToDataRequestDataSelection(): void {
    this.navigationHelperService.navigateToDataQueryDataSelection();
  }
}
