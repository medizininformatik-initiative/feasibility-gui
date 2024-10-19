import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../services/DataSelectionProfileProvider.service';
import { map, Observable } from 'rxjs';
import { DataSelectionProviderService } from '../../services/DataSelectionProvider.service';
import {DownloadCRDTLService} from "../../../../service/Download/DownloadCRDTL.service";

@Component({
  selector: 'num-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.scss'],
})
export class DisplayProfilesComponent implements OnInit {
  @Input() isEditable: boolean;
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfileProfile>>;

  constructor(
    public elementRef: ElementRef,
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService,
    private downloadCRDTLService: DownloadCRDTLService
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
  scroll() {
    this.showActionBar = false;
    this.scrollClick.emit(true);
  }
}
