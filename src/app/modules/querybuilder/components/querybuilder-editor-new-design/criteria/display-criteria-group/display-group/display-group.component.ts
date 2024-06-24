import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { map, Observable, Subscription } from 'rxjs';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
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
    this.querySubscription = this.queryService
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
      });
  }

  private flattenCriteria(criteria: Criterion[][]): Criterion[] {
    return Array.prototype.concat.apply([], criteria);
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
