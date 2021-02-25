import { Component, Inject, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit {
  critDefinitionList: Array<TerminologyEntry> = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<TerminologyEntry>) {
    this.critDefinitionList = data
  }

  ngOnInit(): void {}
}
