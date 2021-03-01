import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { ValueFilter } from '../../../../model/api/query/valueFilter'
import { FeatureService } from '../../../../../../service/feature.service'

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit, AfterViewChecked {
  @Input()
  criterion: Criterion

  @Input()
  actionButtonKey: string

  @Output()
  save = new EventEmitter()

  @Output()
  discard = new EventEmitter<void>()

  @ViewChildren(EditValueFilterComponent) valueFilterComponents: QueryList<EditValueFilterComponent>

  actionDisabled = true

  constructor(public featureService: FeatureService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.actionDisabled = this.isActionDisabled()
    this.changeDetector.detectChanges()
  }

  doSave(): void {
    if (this.isActionDisabled()) {
      return
    }

    this.save.emit()
  }

  doDiscard(): void {
    this.discard.emit()
  }

  isActionDisabled(): boolean {
    return (
      !this.valueFilterComponents ||
      !!this.valueFilterComponents.find((filterComoponent) => filterComoponent.isActionDisabled())
    )
  }

  getValueFilters(): ValueFilter[] {
    if (!this.featureService.useFeatureMultipleValueDefinitions()) {
      return this.criterion.valueFilters.length === 0 ? [] : [this.criterion.valueFilters[0]]
    }

    return this.criterion.valueFilters
  }
}
