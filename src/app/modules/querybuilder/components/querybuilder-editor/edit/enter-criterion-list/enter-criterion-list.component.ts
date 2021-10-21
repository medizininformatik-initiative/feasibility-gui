import { Component, Inject, OnInit } from '@angular/core'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Criterion } from '../../../../model/api/query/criterion'
import { TermEntry2CriterionTranslator } from '../../../../controller/TermEntry2CriterionTranslator'
import { CritType } from '../../../../model/api/query/group'
import { Query } from '../../../../model/api/query/query'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { FeatureService } from '../../../../../../service/feature.service'

export class EnterCriterionListComponentData {
  groupIndex: number
  critType: CritType
  termEntryList: Array<TerminologyEntry>
  query: Query
}

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit {
  private readonly translator

  criterionList: Array<Criterion> = []
  groupIndex: number
  critType: CritType
  query: Query

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EnterCriterionListComponent, void>,
    public provider: QueryProviderService,
    public featureService: FeatureService
  ) {
    this.translator = new TermEntry2CriterionTranslator(
      this.featureService.useFeatureTimeRestriction(),
      this.featureService.getQueryVersion()
    )

    this.criterionList = data.termEntryList.map((termEntry) => this.translator.translate(termEntry))
    this.critType = data.critType
    this.groupIndex = data.groupIndex
    this.query = data.query
  }

  ngOnInit(): void {}

  doSave(event: { groupId: number }, criterion: Criterion): void {
    const index = this.query.groups.findIndex((group) => group.id === event.groupId)

    if (index < 0) {
      return
    }

    if (this.critType === 'inclusion') {
      this.query.groups[index].inclusionCriteria.push([criterion])
    } else {
      this.query.groups[index].exclusionCriteria.push([criterion])
    }

    this.provider.store(this.query)
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
