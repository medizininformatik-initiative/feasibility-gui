import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FeasibilityQueryValidation } from 'src/app/service/Criterion/FeasibilityQueryValidation.service';
import { map, Observable, Subscription, take } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { FeatureService } from '../../../../service/Feature.service';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, OnDestroy {
  @Input() showActionBar;
  @Output()
  scrollClick = new EventEmitter();

  saveDataQueryModalSubscription: Subscription;

  isDataSelectionExistent$: Observable<boolean>;
  isCohortExistent$: Observable<boolean>;

  downloadSubscription: Subscription;
  translatedCRTLDSubscription: Subscription;
  fileName: string;
  createDSSubscription: Subscription;
  emailLink: string;
  constructor(
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private feasibilityQueryValidation: FeasibilityQueryValidation,
    private featureService: FeatureService
  ) {}

  ngOnInit(): void {
    this.isDataSelectionExistent$ = this.dataSelectionProviderService
      .getActiveDataSelection()
      .pipe(map((dataSelection) => dataSelection.getProfiles().length > 0));

    this.isCohortExistent$ = this.feasibilityQueryValidation.getIsFeasibilityQueryValid();
    this.emailLink = this.featureService.getLegalEmail();
  }

  ngOnDestroy(): void {
    this.downloadSubscription?.unsubscribe();
    this.translatedCRTLDSubscription?.unsubscribe();
    this.createDSSubscription?.unsubscribe();
  }

  public navigateToDataQueryCohortDefinition() {
    this.navigationHelperService.navigateToDataQueryCohortDefinition();
  }
}
