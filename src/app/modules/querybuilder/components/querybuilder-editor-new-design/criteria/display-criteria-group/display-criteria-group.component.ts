import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQueryProviderService } from '../../../../../../service/Provider/FeasibilityQueryProvider.service';
import { CriterionProviderService } from '../../../../../../service/Provider/CriterionProvider.service';

@Component({
  selector: 'num-display-criteria-group',
  templateUrl: './display-criteria-group.component.html',
  styleUrls: ['./display-criteria-group.component.scss'],
})
export class DisplayCriteriaGroupComponent implements OnInit {
  droppedItems: Criterion[] = [];
  groupType: 'Inclusion' | 'Exclusion';
  querySubscription: Subscription;

  constructor(
    private queryProviderService: FeasibilityQueryProviderService,
    private criterionProviderService: CriterionProviderService
  ) {}

  ngOnInit() {}

  /*dropped(event: CdkDragDrop<any[]>, groupType) {
    this.groupType = groupType;
    if (event.previousContainer !== event.container) {
      const droppedCriterion: Criterion = event.item.data;
      this.setFeasibilityQuery(droppedCriterion);
      this.criterionProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
    }
  }

  setFeasibilityQuery(criterion: Criterion) {
    const groupId = 0;
    if (this.groupType === 'Inclusion') {
      //this.queryProviderService.setInclusionCriteria(groupId, [[criterion]]);
    } else if (this.groupType === 'Exclusion') {
      //this.queryProviderService.setExclusionCriteria(groupId, [[criterion]]);
    }
    //this.queryProviderService.getFeasibilityQuery().subscribe((test) => console.log(test.groups[0]));
  }*/
}
