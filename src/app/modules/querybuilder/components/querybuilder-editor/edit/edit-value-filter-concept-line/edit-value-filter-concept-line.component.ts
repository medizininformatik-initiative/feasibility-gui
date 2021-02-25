import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TerminologyCode } from '../../../../model/api/terminology/terminology'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'num-edit-value-filter-concept-line',
  templateUrl: './edit-value-filter-concept-line.component.html',
  styleUrls: ['./edit-value-filter-concept-line.component.scss'],
})
export class EditValueFilterConceptLineComponent implements OnInit {
  @Input()
  concept: TerminologyCode

  @Input()
  checked: boolean

  checkedControlForm: FormGroup

  @Output()
  selectConcept = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {
    this.checkedControlForm = new FormGroup({
      checkedControl: new FormControl(this.checked),
    })
  }

  doSelectConcept(): void {
    this.selectConcept.emit()
  }
}
