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
import { Criterion } from '../../../../model/api/query/criterion';
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component';
import { OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter';
import { FeatureService } from '../../../../../../service/feature.service';
import { Query } from '../../../../model/api/query/query';
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { TimeRestrictionType } from '../../../../model/api/query/timerestriction';
import { TermEntry2CriterionTranslator } from 'src/app/modules/querybuilder/controller/TermEntry2CriterionTranslator';

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  criterion: Criterion;

  @Input()
  searchType: string;

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

  queryCriterionList: Array<Criterion> = [];
  queryCriteriaHashes: Array<string> = [];
  private readonly translator;

  constructor(
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    private backend: BackendService
  ) {
    this.translator = new TermEntry2CriterionTranslator(
      this.featureService.useFeatureTimeRestriction(),
      this.featureService.getQueryVersion()
    );
  }

  ngOnInit(): void {
    console.log(this.searchType);
    if (this.position) {
      this.selectedGroupId = this.position.groupId;
    } else {
      this.selectedGroupId = this.query.groups[0].id;
    }

    this.showGroups = this.query.groups.length > 1;
    this.createListOfQueryCriteriaAndHashes();
    this.loadUIProfile();
  }
  ngOnDestroy(): void {
    this.subscriptionCritProfile?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.actionDisabled = this.isActionDisabled();
    this.changeDetector.detectChanges();
  }

  createListOfQueryCriteriaAndHashes(): void {
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((andGroup) => {
        andGroup.forEach((criterion) => {
          this.queryCriterionList.push(criterion);
          this.queryCriteriaHashes.push(criterion.criterionHash);
        });
      });
    }
  }

  initCriterion(profile): void {
    let attrDefs = [];
    if (profile.attributeDefinitions) {
      attrDefs = profile.attributeDefinitions;
    }

    this.criterion = this.translator.addAttributeAndValueFilterToCrit(
      this.criterion,
      profile.valueDefinition,
      attrDefs
    );
  }

  loadUIProfile(): void {
    this.subscriptionCritProfile = this.backend
      .getTerminologyProfile(this.criterion)
      .subscribe((profile) => {
        if (
          this.criterion.valueFilters.length === 0 &&
          this.criterion.attributeFilters.length === 0
        ) {
          this.initCriterion(profile);
        }

        if (profile.timeRestrictionAllowed && !this.criterion.timeRestriction) {
          this.criterion.timeRestriction = { tvpe: TimeRestrictionType.BETWEEN };
        }

        if (profile.valueDefinition?.type === 'concept') {
          if (profile.valueDefinition?.selectableConcepts) {
            this.criterion.valueFilters[0].valueDefinition = profile.valueDefinition;
          }
        }
        if (profile.valueDefinition?.type === 'quantity') {
          this.criterion.valueFilters[0].precision = profile.valueDefinition.precision;
          if (profile.valueDefinition) {
            this.criterion.valueFilters[0].valueDefinition = profile.valueDefinition;
          }
        }
        this.criterion.attributeFilters?.forEach((attribute) => {
          if (profile.attributeDefinitions) {
            const find = profile.attributeDefinitions.find(
              (attr) => attr.attributeCode.code === attribute.attributeDefinition.attributeCode.code
            );
            if (find.type === 'concept') {
              if (find.selectableConcepts) {
                attribute.attributeDefinition.selectableConcepts = find.selectableConcepts;
              }
            }
            if (find.type === 'quantity') {
              attribute.precision = find.precision;
              attribute.attributeDefinition.allowedUnits = find.allowedUnits;
              if (find.selectableConcepts) {
                attribute.attributeDefinition.selectableConcepts = find.selectableConcepts;
              }
            }
          }
        });

        this.loadAllowedCriteria();
      });
  }

  loadAllowedCriteria(): void {
    this.criterion.attributeFilters.forEach((attrFilter) => {
      const refValSet = attrFilter.attributeDefinition.referenceCriteriaSet;
      if (refValSet) {
        this.subscriptionCritProfile = this.backend
          .getAllowedReferencedCriteria(refValSet, this.queryCriteriaHashes)
          .subscribe((allowedCriteriaList) => {
            attrFilter.attributeDefinition.selectableConcepts = [];
            if (allowedCriteriaList.length > 0) {
              attrFilter.type = OperatorOptions.REFERENCE;
              allowedCriteriaList.forEach((critHash) => {
                attrFilter.attributeDefinition.selectableConcepts.push(
                  this.findCriterionByHash(critHash).termCodes[0]
                );
              });
            }
          });
      }
    });
  }

  findCriterionByHash(hash: string): Criterion {
    let tempCrit: Criterion;

    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.criterionHash === hash) {
            tempCrit = conj;
          }
        });
      });
    }
    return tempCrit;
  }

  doSave(): void {
    if (this.isActionDisabled()) {
      return;
    }
    this.moveBetweenGroups();
    this.moveReferenceCriteria();
    console.log(this.query);
    this.save.emit({ groupId: this.selectedGroupId });
  }

  doDiscard(): void {
    this.discard.emit();
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
  getAttributeFilters(): ValueFilter[] {
    if (this.criterion.attributeFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.attributeFilters.length === 0
          ? []
          : [this.criterion.attributeFilters[0]];
      }

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

  moveReferenceCriteria(): void {
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.isLinked && disj.length > 1) {
            this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
              this.query.groups,
              conj.position,
              {
                groupId: conj.position.groupId,
                critType: conj.position.critType,
                column: -1,
                row: -1,
              }
            );
          }
        });
      });
    }
  }
}
