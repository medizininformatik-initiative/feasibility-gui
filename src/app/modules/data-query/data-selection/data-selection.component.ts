import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();

  isDataSelectionExistent = false;
  isCohortExistent = false;

  fileName: string;
  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      this.isDataSelectionExistent = dataSelection.getProfiles().length > 0;
    });

    this.feasibilityQueryProviderService.getIsFeasibilityQueryValid().subscribe((isValid) => {
      this.isCohortExistent = isValid;
    });
  }

  public navigateToDataQueryCohortDefinition() {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
