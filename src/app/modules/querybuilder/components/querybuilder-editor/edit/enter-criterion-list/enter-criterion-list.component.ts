import { Component, Inject, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Criterion } from '../../../../model/api/query/criterion'
import { TermEntry2CriterionTranslator } from '../../../../controller/TermEntry2CriterionTranslator'

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit {
  private readonly translator = new TermEntry2CriterionTranslator()

  criterionList: Array<Criterion> = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<TerminologyEntry>) {
    this.criterionList = data.map((termEntry) => this.translator.translate(termEntry))
  }

  ngOnInit(): void {}
}
