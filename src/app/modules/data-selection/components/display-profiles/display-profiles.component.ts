import { Component, OnInit } from '@angular/core';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProviderService } from '../../services/DataSelectionProviderService';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'num-display-profiles',
  templateUrl: './display-profiles.component.html',
  styleUrls: ['./display-profiles.component.scss'],
})
export class DisplayProfilesComponent implements OnInit {
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfileProfile>>;

  constructor(private dataSelectionProvider: DataSelectionProviderService) {}

  ngOnInit(): void {
    this.getDataSelectionProfiles();
  }

  private getDataSelectionProfiles() {
    this.$dataSelectionProfileArray = this.dataSelectionProvider
      .getDataSelectionProfileUIDMap()
      .pipe(map((dataSelectionProfileMap) => Array.from(dataSelectionProfileMap.values())));
  }
}
