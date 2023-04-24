import { Component, Inject, Input, OnInit } from '@angular/core';
import { TerminologyEntry } from '../../../../model/api/terminology/terminology';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Criterion } from '../../../../model/api/query/criterion';
import { TermEntry2CriterionTranslator } from '../../../../controller/TermEntry2CriterionTranslator';
import { CritType } from '../../../../model/api/query/group';
import { Query } from '../../../../model/api/query/query';
import { QueryProviderService } from '../../../../service/query-provider.service';
import { FeatureService } from '../../../../../../service/feature.service';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { CritGroupArranger } from '../../../../controller/CritGroupArranger';

export class EnterCriterionListComponentData {
  groupIndex: number;
  critType: CritType;
  termEntryList: Array<TerminologyEntry>;
  query: Query;
  searchType: string;
}

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit {
  private subscriptionCritProfile: Subscription;
  criterionList: Array<Criterion> = [];
  groupIndex: number;
  critType: CritType;
  query: Query;
  searchType: string;
  actionDisabled = true;
  criterionAddibleList: Array<{
    criterion: Criterion
    groupID: number
    isAddible: boolean
  }> = [];
  private readonly translator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EnterCriterionListComponent, void>,
    public provider: QueryProviderService,
    public featureService: FeatureService,
    private backend: BackendService
  ) {
    this.translator = new TermEntry2CriterionTranslator(
      this.featureService.useFeatureTimeRestriction(),
      this.featureService.getQueryVersion()
    );

    this.query = data.query;
    this.criterionList = data.termEntryList.map((termEntry) => this.translator.translate(termEntry));
    this.critType = data.critType;
    this.groupIndex = data.groupIndex;
    this.query = data.query;
    this.searchType = data.searchType;
  }

  ngOnInit(): void {
    this.criterionList.forEach((curCriterion) => {
      this.criterionAddibleList.push({
        criterion: curCriterion,
        groupID: undefined,
        isAddible: undefined,
      });
    });
  }

  ngOnDestroy(): void {}

  addContextToCriterionList(data: EnterCriterionListComponentData): void {
    data.termEntryList.forEach((termEntryListContext) => {
      this.criterionList.forEach((criterion) => {
        criterion.context = termEntryListContext.context;
      });
    });
  }

  doSave(event: { groupId: number }, criterion: Criterion): void {
    const index = this.query.groups.findIndex((group) => group.id === event.groupId);

    if (index < 0) {
      return;
    }

    if (this.critType === 'inclusion') {
      this.query.groups[index].inclusionCriteria.push([criterion]);
    } else {
      this.query.groups[index].exclusionCriteria.push([criterion]);
    }
    this.moveReferenceCriteria();
    this.provider.store(this.query);
    this.doDiscard(criterion);
  }

  registerAllAddible(event: { groupId: number; isaddible: boolean }, criterion: Criterion): void {
    const element = this.criterionAddibleList.find(
      (criterionTemp) => criterionTemp.criterion.display === criterion.display
    );
    element.isAddible = event.isaddible;
    element.groupID = event.groupId;

    this.actionDisabled = this.getAddibleList().length < 1;
  }

  doSaveAll(): void {
    this.getAddibleList().forEach((thisCriterium) => {
      if (thisCriterium.isAddible) {
        this.doSave({ groupId: thisCriterium.groupID }, thisCriterium.criterion);
      }
    });
    this.actionDisabled = this.getAddibleList().length < 1;
  }

  getAddibleList(): Array<any> {
    return this.criterionAddibleList.filter((list) => list.isAddible);
  }

  doDiscard(criterion: Criterion): void {
    const index = this.criterionList.findIndex((critrionTemp) => critrionTemp === criterion);
    const index2 = this.criterionAddibleList.findIndex(
      (critrionTemp) => critrionTemp.criterion === criterion
    );

    this.criterionList.splice(index, 1);
    this.criterionAddibleList.splice(index2, 1);
    if (this.criterionList.length === 0) {
      this.dialogRef.close();
    }
  }

  doDiscardAll(): void {
    this.dialogRef.close();
  }

  moveReferenceCriteria(): void {
    for (const inex of ['inclusion', 'exclusion']) {
      this.query.groups[0][inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.isLinked && conj.position.column > 0) {
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
