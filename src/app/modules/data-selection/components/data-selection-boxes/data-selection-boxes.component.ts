import { Component, OnInit } from '@angular/core';
import { DataSelectionProviderService } from '../../services/DataSelectionProviderService';
import { map, Observable } from 'rxjs';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
})
export class DataSelectionBoxesComponent implements OnInit {
  $dataSelectionProfileArray: Observable<Array<DataSelectionProfileProfile>>;

  constructor(private dataSelectionProvider: DataSelectionProviderService) {}

  ngOnInit(): void {
    this.getDataSelectionProfiles();
  }

  getDataSelectionProfiles() {
    this.$dataSelectionProfileArray = this.dataSelectionProvider
      .getDataSelectionProfileUIDMap()
      .pipe(map((dataSelectionProfileMap) => Array.from(dataSelectionProfileMap.values())));
  }
}
