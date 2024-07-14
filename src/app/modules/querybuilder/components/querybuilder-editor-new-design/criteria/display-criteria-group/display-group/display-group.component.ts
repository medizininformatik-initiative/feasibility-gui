import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, take } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';

@Component({
  selector: 'num-display-group',
  templateUrl: './display-group.component.html',
  styleUrls: ['./display-group.component.scss'],
})
export class DisplayGroupComponent implements OnInit, OnDestroy {
  @Input() groupType: string;

  critType = 'inclusion';
  criteriaArray$: Observable<Criterion[][]>;
  private querySubscription: Subscription;

  constructor(private queryService: FeasibilityQueryProviderService) {}

  ngOnInit() {
    this.querySubscription = this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          this.critType = 'inclusion';
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => queryObject.getInclusionCriteria()));
        } else if (this.groupType === 'Exclusion') {
          this.critType = 'exclusion';
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => queryObject.getExclusionCriteria()));
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

  getInnerLabelKey(): 'AND' | 'OR' {
    return this.critType === 'inclusion' ? 'OR' : 'AND';
  }

  getOuterLabelKey(): 'AND' | 'OR' {
    return this.critType === 'exclusion' ? 'OR' : 'AND';
  }

  splitInnerArray(i: number, j: number): void {
    console.log('split');
    let tempQuery: FeasibilityQuery = new FeasibilityQuery();

    this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.critType === 'inclusion') {
          tempQuery = query;
        }
        if (this.critType === 'exclusion') {
          this.queryService.setExclusionCriteria(
            this.splitInnerArray2(query.getExclusionCriteria(), i, j)
          );
        }
        //this.switch.emit(this.critGroup);
      })
      .unsubscribe();
    this.queryService.setInclusionCriteria(
      this.splitInnerArray2(tempQuery.getInclusionCriteria(), i, j)
    );
  }

  joinInnerArrays(i: number): void {
    console.log('join');
    this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.critType === 'inclusion') {
          this.queryService.setInclusionCriteria(
            this.joinInnerArrays2(query.getInclusionCriteria(), i)
          );
        }
        if (this.critType === 'exclusion') {
          this.queryService.setExclusionCriteria(
            this.joinInnerArrays2(query.getExclusionCriteria(), i)
          );
        }
      })
      .unsubscribe();
    //this.critGroup = CritGroupArranger.joinInnerArrays(this.critGroup, i);
    //this.switch.emit(this.critGroup);
  }

  public splitInnerArray2(critGroup: Criterion[][], i: number, j: number): Criterion[][] {
    const critGroupTemp: Criterion[][] = [];

    let index = 0;
    critGroup.forEach((subarray) => {
      if (index === i) {
        critGroupTemp.push(subarray.slice(0, j + 1));
        critGroupTemp.push(subarray.slice(j + 1));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
  }

  public joinInnerArrays2(critGroup: Criterion[][], i: number): Criterion[][] {
    const critGroupTemp: Criterion[][] = [];

    let index = 0;
    let subarrayTemp;
    critGroup.forEach((subarray) => {
      if (index === i) {
        subarrayTemp = subarray;
      } else if (index === i + 1) {
        critGroupTemp.push(subarrayTemp.concat(subarray));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
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
