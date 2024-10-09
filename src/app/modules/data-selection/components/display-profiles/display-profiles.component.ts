import { Component, OnInit, Input } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../services/DataSelectionProfileProvider.service';
import { map, Observable } from 'rxjs';
import { DataSelectionProviderService } from '../../services/DataSelectionProvider.service';

@Component({
  selector: 'num-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.scss'],
})
export class DisplayProfilesComponent implements OnInit {
  @Input() isEditable: boolean;
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfileProfile>>;

  constructor(
    private dataSelectionProfileProvider: DataSelectionProfileProviderService,
    private dataSelectionProvider: DataSelectionProviderService
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
}
