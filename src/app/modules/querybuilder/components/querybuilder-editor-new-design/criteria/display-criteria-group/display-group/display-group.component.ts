import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, take } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';

@Component({
  selector: 'num-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.scss'],
})
export class DisplayGroupComponent implements OnInit, OnDestroy {
  @Input() groupType: string;

  criteriaArray$: Observable<Criterion[]>;
  private querySubscription: Subscription;

  constructor(
    private queryService: FeasibilityQueryProviderService,
    private criterionProvider: CriterionProviderService
  ) {}

  ngOnInit() {
    /*this.querySubscription = this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => this.flattenCriteria(queryObject.getInclusionCriteria())));
        } else if (this.groupType === 'Exclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => this.flattenCriteria(queryObject.getExclusionCriteria())));
        }
      });*/
  }

  private flattenCriteria(criteria: string[][]): Criterion[] {
    return Array.prototype.concat.apply([], criteria);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  /*dropped(event: CdkDragDrop<Criterion[]>) {
    const droppedCriterion: Criterion = event.item.data;

    // Determine the source and destination group types
    const sourceGroup = this.groupType;
    const destinationGroup = event.container.id === 'inclusion-group' ? 'Inclusion' : 'Exclusion';

    // Only proceed if the criterion is moved between different groups
    if (sourceGroup !== destinationGroup) {
      // Remove from source group
      this.criteriaArray$.pipe(take(1)).subscribe((criteria) => {
        const sourceIndex = criteria.findIndex(
          (c) => c.getUniqueID() === droppedCriterion.getUniqueID()
        );
        if (sourceIndex !== -1) {
          criteria.splice(sourceIndex, 1);
        }
      });

      // Add to destination group
      this.queryService
        .getFeasibilityQuery()
        .pipe(take(1))
        .subscribe((query) => {
          const destinationCriteria =
            destinationGroup === 'Inclusion' ? 'inclusionCriteria' : 'exclusionCriteria';
          //query.groups[0][destinationCriteria].push([droppedCriterion]);
          this.queryService.setFeasibilityQuery(query);
        });
    }
  }*/
}
