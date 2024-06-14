import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, take } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.scss'],
})
export class DisplayGroupComponent implements OnInit, OnDestroy {
  @Input() groupType: string;

  criteriaArray$: Observable<Criterion[]>;
  private querySubscription: Subscription;

  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.querySubscription = this.queryService.getFeasibilityQuery().subscribe((query: Query) => {
      if (query && query.groups && query.groups.length > 0) {
        if (this.groupType === 'Inclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(
              map((queryObject) => this.flattenCriteria(queryObject.groups[0].inclusionCriteria))
            );
        } else if (this.groupType === 'Exclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(
              map((queryObject) => this.flattenCriteria(queryObject.groups[0].exclusionCriteria))
            );
        }
      }
    });
  }

  private flattenCriteria(criteria: Criterion[][]): Criterion[] {
    // Using Array.prototype.concat() and apply() to flatten the array
    return Array.prototype.concat.apply([], criteria);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  dropped(event: CdkDragDrop<Criterion[]>) {
    const droppedCriterion: Criterion = event.item.data;

    // Determine the source and destination group types
    const sourceGroup = this.groupType;
    const destinationGroup = event.container.id === 'inclusion-group' ? 'Inclusion' : 'Exclusion';

    // Only proceed if the criterion is moved between different groups
    if (sourceGroup !== destinationGroup) {
      // Remove from source group
      this.criteriaArray$.pipe(take(1)).subscribe((criteria) => {
        const sourceIndex = criteria.findIndex((c) => c.uniqueID === droppedCriterion.uniqueID);
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
          query.groups[0][destinationCriteria].push([droppedCriterion]);
          this.queryService.setFeasibilityQuery(query);
        });
    }
  }
}
