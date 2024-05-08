import { AttributeFilter } from '../../../../../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../../../../service/backend.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger';
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component';
import { FeatureService } from '../../../../../../service/Feature.service';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { Subscription } from 'rxjs';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TimeRestriction } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { FilterTypesService } from '../../../../../../service/FilterTypes.service';
import { QueryService } from '../../../../../../service/QueryService.service';
import { ReferenceCriteriaService } from '../../../../../../service/CriterionService/reference-criteria.service';
@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  criterion: Criterion;

  @Input()
  query: Query;

  @Input()
  position: CritGroupPosition;

  @Input()
  actionButtonKey: string;

  @Output()
  save = new EventEmitter<{ groupId: number }>();

  @Output()
  addible = new EventEmitter<{ groupId: number; isaddible: boolean }>();

  @Output()
  discard = new EventEmitter<void>();

  @ViewChildren(EditValueFilterComponent) valueFilterComponents: QueryList<EditValueFilterComponent>;

  actionDisabled = true;

  selectedGroupId: number;

  showGroups: boolean;

  private subscriptionCritProfile: Subscription;

  constructor(
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    public provider: QueryService,
    private backend: BackendService,
    private referenceService: ReferenceCriteriaService,
    private filter: FilterTypesService
  ) {}

  ngOnInit(): void {
    if (this.position) {
      this.selectedGroupId = this.position.groupId;
    } else {
      this.selectedGroupId = this.query.groups[0].id;
    }

    this.showGroups = this.query.groups.length > 1;

    this.criterion.attributeFilters.forEach((attributeFilter) => {
      if (this.filter.isReference(attributeFilter.type)) {
        this.criterion = this.referenceService.applyReferencesToCriterion(this.criterion);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionCritProfile?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.actionDisabled = this.isActionDisabled();
    this.changeDetector.detectChanges();
  }

  doSave(): void {
    if (this.isActionDisabled()) {
      return;
    }
    this.moveBetweenGroups();
    this.save.emit({ groupId: this.selectedGroupId });
  }

  doDiscard(): void {
    this.discard.emit();
  }

  resetTimeRestriction() {
    this.criterion.timeRestriction = new TimeRestriction();
  }

  isActionDisabled(): boolean {
    const addibleTemp =
      !this.valueFilterComponents ||
      !!this.valueFilterComponents.find((filterComponent) => filterComponent.isActionDisabled());
    this.addible.emit({ groupId: this.selectedGroupId, isaddible: !addibleTemp });
    return addibleTemp;
  }

  getValueFilters(): ValueFilter[] {
    if (this.criterion.valueFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]];
      }

      return this.criterion.valueFilters;
    } else {
      return [];
    }
  }

  getAttributeFilters(): AttributeFilter[] {
    if (this.criterion.attributeFilters) {
      return this.criterion.attributeFilters;
    } else {
      return [];
    }
  }

  moveBetweenGroups(): void {
    if (!this.position || this.position.groupId === this.selectedGroupId) {
      return;
    }

    if (!ObjectHelper.isNumber(this.position.row) || !ObjectHelper.isNumber(this.position.column)) {
      return;
    }

    this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
      this.query.groups,
      this.position,
      {
        groupId: this.selectedGroupId,
        critType: this.position.critType,
        column: -1,
        row: -1,
      }
    );
  }
}
