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
} from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { ValueFilter } from '../../../../model/api/query/valueFilter'
import { FeatureService } from '../../../../../../service/feature.service'
import { Query } from '../../../../model/api/query/query'
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger'
import { ObjectHelper } from '../../../../controller/ObjectHelper'
import { Subscription } from 'rxjs'
import { BackendService } from '../../../../service/backend.service'
import { TimeRestrictionType } from '../../../../model/api/query/timerestriction'

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input()
  criterion: Criterion

  @Input()
  query: Query

  @Input()
  position: CritGroupPosition

  @Input()
  actionButtonKey: string

  @Output()
  save = new EventEmitter<{ groupId: number }>()

  @Output()
  addible = new EventEmitter<{ groupId: number; isaddible: boolean }>()

  @Output()
  discard = new EventEmitter<void>()

  @ViewChildren(EditValueFilterComponent) valueFilterComponents: QueryList<EditValueFilterComponent>

  actionDisabled = true

  selectedGroupId: number

  showGroups: boolean

  private subscriptionCritProfile: Subscription

  constructor(
    public featureService: FeatureService,
    private changeDetector: ChangeDetectorRef,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    if (this.position) {
      this.selectedGroupId = this.position.groupId
    } else {
      this.selectedGroupId = this.query.groups[0].id
    }

    this.showGroups = this.query.groups.length > 1

    if (!this.featureService.mockLoadnSave()) {
      this.loadUIProfile()
    }
  }

  ngOnDestroy(): void {
    this.subscriptionCritProfile?.unsubscribe()
  }

  ngAfterViewChecked(): void {
    this.actionDisabled = this.isActionDisabled()
    this.changeDetector.detectChanges()
  }

  loadUIProfile(): void {
    this.subscriptionCritProfile?.unsubscribe()
    const version = this.criterion.termCodes[0].version
      ? '&version=' + this.criterion.termCodes[0].version
      : ''
    const param =
      'code=' +
      this.criterion.termCodes[0].code +
      '&system=' +
      this.criterion.termCodes[0].system +
      version
    this.subscriptionCritProfile = this.backend
      .getTerminologyProfile(param)
      .subscribe((profile) => {
        if (profile.timeRestrictionAllowed && !this.criterion.timeRestriction) {
          this.criterion.timeRestriction = { tvpe: TimeRestrictionType.BETWEEN }
        }

        if (profile.valueDefinition?.type === 'concept') {
          if (profile.valueDefinition?.selectableConcepts) {
            this.criterion.valueFilters[0].valueDefinition = profile.valueDefinition
          }
        }
        if (profile.valueDefinition?.type === 'quantity') {
          this.criterion.valueFilters[0].precision = profile.valueDefinition.precision
          if (profile.valueDefinition) {
            this.criterion.valueFilters[0].valueDefinition = profile.valueDefinition
          }
        }
        this.criterion.attributeFilters?.forEach((attribute) => {
          if (profile.attributeDefinitions) {
            const find = profile.attributeDefinitions.find(
              (attr) => attr.attributeCode.code === attribute.attributeDefinition.attributeCode.code
            )
            if (find.type === 'concept') {
              if (find.selectableConcepts) {
                attribute.attributeDefinition.selectableConcepts = find.selectableConcepts
              }
            }
            if (find.type === 'quantity') {
              attribute.precision = find.precision
              attribute.attributeDefinition.allowedUnits = find.allowedUnits
              if (find.selectableConcepts) {
                attribute.attributeDefinition.selectableConcepts = find.selectableConcepts
              }
            }
          }
        })
      })
  }

  doSave(): void {
    if (this.isActionDisabled()) {
      return
    }

    this.moveBetweenGroups()

    this.save.emit({ groupId: this.selectedGroupId })
  }

  doDiscard(): void {
    this.discard.emit()
  }

  isActionDisabled(): boolean {
    const addibleTemp =
      !this.valueFilterComponents ||
      !!this.valueFilterComponents.find((filterComponent) => filterComponent.isActionDisabled())
    this.addible.emit({ groupId: this.selectedGroupId, isaddible: !addibleTemp })
    return addibleTemp
  }

  getValueFilters(): ValueFilter[] {
    if (this.criterion.valueFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]]
      }

      return this.criterion.valueFilters
    } else {
      return []
    }
  }
  getAttributeFilters(): ValueFilter[] {
    if (this.criterion.attributeFilters) {
      if (!this.featureService.useFeatureMultipleValueDefinitions()) {
        return this.criterion.attributeFilters.length === 0
          ? []
          : [this.criterion.attributeFilters[0]]
      }

      return this.criterion.attributeFilters
    } else {
      return []
    }
  }

  moveBetweenGroups(): void {
    if (!this.position || this.position.groupId === this.selectedGroupId) {
      return
    }

    if (!ObjectHelper.isNumber(this.position.row) || !ObjectHelper.isNumber(this.position.column)) {
      return
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
    )
  }
}
