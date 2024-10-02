import { Component, OnInit } from '@angular/core';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  isDataSelectionExistent = false;
  constructor(
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      if (dataSelection.getProfiles().length > 0) {
        this.isDataSelectionExistent = true;
      } else {
        this.isDataSelectionExistent = false;
      }
    });
  }

  public editDataSelection() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public createNewDataSelection() {
    const dataSelection = new DataSelection([], uuidv4());
    this.dataSelectionProviderService.setDataSelectionByUID(
      dataSelection.getId(),
      dataSelection,
      true
    );
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public downloadDataSelection() {}
}
