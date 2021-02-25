import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Criterion } from '../../../../model/api/query/criterion'
import { TerminologyCode } from '../../../../model/api/terminology/terminology'

@Component({
  selector: 'num-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss'],
})
export class EditCriterionComponent implements OnInit {
  @Input()
  criterion: Criterion

  @Output()
  save = new EventEmitter()

  @Output()
  discard = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {}

  doSave(): void {
    this.save.emit()
  }

  doDiscard(): void {
    this.discard.emit()
  }

  doSelectConcept(selectedConcepts: Array<TerminologyCode>): void {
    this.criterion.valueFilter.selectedConcepts = selectedConcepts
  }
}
