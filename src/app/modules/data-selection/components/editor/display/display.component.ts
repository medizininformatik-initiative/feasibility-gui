import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../../services/DataSelectionProfileProvider.service';
import { DataSelectionProviderService } from '../../../services/DataSelectionProvider.service';
import { DownloadCRDTLService } from '../../../../../service/Download/DownloadCRDTL.service';
import { map, Observable } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

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
    public elementRef: ElementRef,
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private downloadCRDTLService: DownloadCRDTLService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.getDataSelectionProfiles();
  }

  /**
   * @todo add rerender of ui component
   */
  private getDataSelectionProfiles() {
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

  public downloadCRDTL() {
    this.downloadCRDTLService.downloadActiveFeasibilityQueryAsFile();
  }

  public navigateToDataSelectionSearch() {
    this.navigationHelperService.navigateToDataSelectionSearch();
  }
}
