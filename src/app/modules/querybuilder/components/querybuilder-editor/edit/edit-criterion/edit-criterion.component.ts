import { AttributeFilter } from '../../../../../../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../../../../service/backend.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger';
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component';
import { FeatureService } from '../../../../../../service/Feature.service';
import { FilterTypes } from '../../../../../../model/FilterTypes';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { QueryProviderService } from '../../../../service/query-provider.service';
import { Subscription } from 'rxjs';
import { TermEntry2CriterionTranslator } from 'src/app/modules/querybuilder/controller/TermEntry2CriterionTranslator';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';
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
import {
  TimeRestriction,
  TimeRestrictionType,
} from 'src/app/model/FeasibilityQuery/TimeRestriction';
@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  searchType: string;

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

  queryCriterionList: Array<Criterion> = [];
  queryCriteriaHashes: Array<string> = [];
  private readonly translator;

  constructor(
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    public provider: QueryProviderService,
    private backend: BackendService
  ) {
    this.translator = new TermEntry2CriterionTranslator(
      this.featureService.useFeatureTimeRestriction(),
      this.featureService.getQueryVersion()
    );
  }

  ngOnInit(): void {
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
  getTermcodeParameters(): string {
    const termCode = this.criterion.termCodes[0];
    const termCodeVersion = termCode.version ? '&version=' + termCode.version : '';
    return 'code=' + termCode.code + '&system=' + termCode.system + termCodeVersion;
  }

  getContextParameters(): string {
    const context = this.criterion.context;
    const contextVersion = context.version ? '&context_version=' + context.version : '';
    return '&context_system=' + context.system + '&context_code=' + context.code + contextVersion;
  }

  getRequestParameters(): string {
    return this.getTermcodeParameters() + this.getContextParameters();
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
      .getTerminologyProfile(this.criterion.criterionHash)
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

        if (profile.attributeDefinitions) {
          profile.attributeDefinitions.forEach((attribute) => {
            const find = this.criterion.attributeFilters?.find(
              (attr) => attr.attributeDefinition.attributeCode.code === attribute.attributeCode.code
            );
            if (!find) {
              const newFilter = new AttributeFilter();
              newFilter.attributeDefinition = attribute;
              newFilter.attributeDefinition.type = attribute.type;
              newFilter.type = attribute.type;
              this.criterion.attributeFilters?.push(newFilter);
            } else {
              find.attributeDefinition.optional = attribute.optional;
              find.attributeDefinition.type = attribute.type;
              if (attribute.type === 'reference') {
                find.attributeDefinition.referenceCriteriaSet = attribute.referenceCriteriaSet;
              }
              if (attribute.type === 'concept') {
                if (attribute.selectableConcepts) {
                  find.attributeDefinition.selectableConcepts = attribute.selectableConcepts;
                }
              }
              if (attribute.type === 'quantity') {
                find.attributeDefinition.precision = attribute.precision;
                find.attributeDefinition.allowedUnits = attribute.allowedUnits;
                if (attribute.selectableConcepts) {
                  find.attributeDefinition.selectableConcepts = attribute.selectableConcepts;
                }
              }
            }
          });
        }

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
              attrFilter.type = FilterTypes.REFERENCE;
              allowedCriteriaList.forEach((critHash) => {
                this.findCriterionByHash(critHash).forEach((crit) => {
                  if (!this.isCriterionLinked(crit.uniqueID)) {
                    const termCodeUid: TerminologyCode = crit.termCodes[0];
                    termCodeUid.uid = crit.uniqueID;
                    attrFilter.attributeDefinition.selectableConcepts.push(termCodeUid);
                  }
                });
              });
            }
          });
      }
    });
  }

  findCriterionByHash(hash: string): Criterion[] {
    const tempCrit: Criterion[] = [];

    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.criterionHash === hash) {
            tempCrit.push(conj);
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
    this.provider.store(this.query);
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

  //TODO: überprüfen der AttributeFilter-Klasse
  getAttributeFilters(): AttributeFilter[] {
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
      let x = 0;
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        let y = 0;
        disj.forEach((conj) => {
          if (conj.isLinked) {
            this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
              this.query.groups,
              {
                groupId: conj.position.groupId,
                critType: conj.position.critType,
                column: conj.position.column - y,
                row: conj.position.row - x,
              },
              {
                groupId: conj.position.groupId,
                critType: conj.position.critType,
                column: -1,
                row: -1,
              }
            );
            if (disj.length === 1) {
              x++;
            }
            if (disj.length > 1) {
              y++;
            }
            this.rePosition();
          }
        });
      });
    }
  }
  rePosition(): void {
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj, i) => {
        disj.forEach((conj, j) => {
          conj.position.row = i;
          conj.position.column = j;
        });
      });
    }
  }
  isCriterionLinked(uid: string): boolean {
    let isLinked = false;

    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.linkedCriteria.length > 0) {
            conj.linkedCriteria.forEach((criterion) => {
              if (criterion.uniqueID === uid && conj.uniqueID !== this.criterion.uniqueID) {
                isLinked = true;
              }
            });
          }
        });
      });
    }

    return isLinked;
  }
}
