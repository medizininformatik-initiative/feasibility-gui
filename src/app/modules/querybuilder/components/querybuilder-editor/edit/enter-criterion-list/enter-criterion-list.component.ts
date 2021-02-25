import { Component, Inject, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Criterion } from '../../../../model/api/query/criterion'
import { TermEntry2CriterionTranslator } from '../../../../controller/TermEntry2CriterionTranslator'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { CritType } from '../../../../model/api/query/group'

export class EnterCriterionListComponentData {
  groupIndex: number
  critType: CritType
  termEntryList: Array<TerminologyEntry>
}

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit {
  private readonly translator = new TermEntry2CriterionTranslator()

  criterionList: Array<Criterion> = []
  groupIndex: number
  critType: CritType

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    public provider: QueryProviderService,
    public dialogRef: MatDialogRef<EnterCriterionListComponent>
  ) {
    this.criterionList = data.termEntryList.map((termEntry) => this.translator.translate(termEntry))
    this.critType = data.critType
    this.groupIndex = data.groupIndex
  }

  ngOnInit(): void {}

  doSave(criterion: Criterion): void {
    const query = this.provider.query()
    if (this.critType === 'inclusion') {
      query.groups[this.groupIndex].inclusionCriteria.push([criterion])
    } else {
      query.groups[this.groupIndex].exclusionCriteria.push([criterion])
    }
    this.provider.store(query)

    this.doDiscard(criterion)
  }

  doDiscard(criterion: Criterion): void {
    const index = this.criterionList.findIndex((critrionTemp) => critrionTemp === criterion)

    this.criterionList.splice(index, 1)
    if (this.criterionList.length === 0) {
      this.dialogRef.close()
    }
  }

  doDiscardAll(): void {
    this.dialogRef.close()
  }
}
