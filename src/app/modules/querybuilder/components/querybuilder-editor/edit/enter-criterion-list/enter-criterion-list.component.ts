import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
//import { TerminologyEntry } from '../../../../model/api/terminology/terminology';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { Criterion } from '../../../../model/api/query/criterion';
import { TermEntry2CriterionTranslator } from '../../../../controller/TermEntry2CriterionTranslator';
//import { CritType } from '../../../../model/api/query/group';
import { Query as QueryOld } from '../../../../model/api/query/query';
import { QueryProviderService } from '../../../../service/query-provider.service';
import { FeatureService } from '../../../../../../service/Feature.service';
import { Criterion } from '../../../../../../model/FeasibilityQuery/Criterion/Criterion';
import { Query } from '../../../../../../model/FeasibilityQuery/Query';
import { CritType } from '../../../../../../model/FeasibilityQuery/Group';
import { TerminologyEntry } from '../../../../../../model/terminology/Terminology';
import { QueryService } from '../../../../../../service/QueryService.service';
import { CritGroupPosition } from '../../../../controller/CritGroupArranger';
import { ObjectHelper } from '../../../../controller/ObjectHelper';
import { ReferenceCriteriaService } from '../../../../../../service/CriterionService/reference-criteria.service';

export class EnterCriterionListComponentData {
  groupIndex: number;
  critType: CritType;
  criterionList: Array<Criterion>;
  query: Query;
  position: CritGroupPosition;
  modus: string;
}

@Component({
  selector: 'num-enter-criterion-list',
  templateUrl: './enter-criterion-list.component.html',
  styleUrls: ['./enter-criterion-list.component.scss'],
})
export class EnterCriterionListComponent implements OnInit, OnDestroy {
  criterionList: Array<Criterion> = [];
  groupIndex: number;
  critType: CritType;
  query: Query;
  actionDisabled = true;
  position: CritGroupPosition;
  modus: string;
  criterionAddibleList: Array<{
    criterion: Criterion
    groupID: number
    isAddible: boolean
  }> = [];
  private readonly translator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnterCriterionListComponentData,
    private dialogRef: MatDialogRef<EnterCriterionListComponent, void>,
    public featureService: FeatureService,
    private queryService: QueryService,
    private referenceService: ReferenceCriteriaService
  ) {
    this.translator = new TermEntry2CriterionTranslator(
      this.featureService.useFeatureTimeRestriction(),
      this.featureService.getQueryVersion()
    );
    //this.criterionList = data.termEntryList.map((termEntry) => this.translator.translate(termEntry));
    this.criterionList = data.criterionList;
    this.critType = data.critType;
    this.groupIndex = data.groupIndex;
    //this.query = data.query;
    this.queryService.getFeasibilityQuery().subscribe((query) => {
      this.query = query;
      if (data.position) {
        this.position = data.position;
      } else {
        this.position = {
          groupId: this.query.groups[this.groupIndex].id,
          critType: data.critType,
          row: undefined,
          column: undefined,
        };
      }
    });
    this.modus = data.modus;
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

  doSave(event: { groupId: number }, criterion: Criterion): void {
    const index = this.query.groups.findIndex((group) => group.id === event.groupId);

    if (index < 0) {
      return;
    }

    if (this.modus === 'create') {
      if (this.critType === 'inclusion') {
        this.query.groups[index].inclusionCriteria.push([criterion]);
      } else {
        this.query.groups[index].exclusionCriteria.push([criterion]);
      }
    }

    this.referenceService.moveReferenceCriteria(this.query);
    this.queryService.setFeasibilityQuery(this.query);
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
}
