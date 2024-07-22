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

  criteriaArray$: Observable<string[][]>;
  private querySubscription: Subscription;

  constructor(
    private queryService: FeasibilityQueryProviderService,
    public criterionProvider: CriterionProviderService
  ) {}

  ngOnInit() {
    this.querySubscription = this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => queryObject.getInclusionCriteria()));
        }
        if (this.groupType === 'Exclusion') {
          this.criteriaArray$ = this.queryService
            .getFeasibilityQuery()
            .pipe(map((queryObject) => queryObject.getExclusionCriteria()));
        }
      });
  }

  private flattenCriteria(criteria: string[][]): Criterion[] {
    return Array.prototype.concat.apply([], criteria);
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }

  getInnerLabelKey(): 'AND' | 'OR' {
    return this.groupType === 'Inclusion' ? 'OR' : 'AND';
  }

  getOuterLabelKey(): 'AND' | 'OR' {
    return this.groupType === 'Exclusion' ? 'OR' : 'AND';
  }

  splitInnerArray(i: number, j: number): void {
    console.log('split');
    console.log(this.groupType);
    let tempcrit: string[][] = [];

    this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          tempcrit = this.splitInnerArray2(query.getInclusionCriteria(), i, j);
        }
        if (this.groupType === 'Exclusion') {
          tempcrit = this.splitInnerArray2(query.getExclusionCriteria(), i, j);
        }
        //this.switch.emit(this.critGroup);
      })
      .unsubscribe();
    if (this.groupType === 'Inclusion') {
      this.queryService.setInclusionCriteria(tempcrit);
    }
    if (this.groupType === 'Exclusion') {
      this.queryService.setExclusionCriteria(tempcrit);
    }
  }

  joinInnerArrays(i: number): void {
    console.log('join');
    console.log(this.groupType);
    let tempcrit: string[][] = [];

    this.queryService
      .getFeasibilityQuery()
      .subscribe((query: FeasibilityQuery) => {
        if (this.groupType === 'Inclusion') {
          tempcrit = this.joinInnerArrays2(query.getInclusionCriteria(), i);
        }
        if (this.groupType === 'Exclusion') {
          tempcrit = this.joinInnerArrays2(query.getExclusionCriteria(), i);
        }
      })
      .unsubscribe();
    if (this.groupType === 'Inclusion') {
      this.queryService.setInclusionCriteria(tempcrit);
    }
    if (this.groupType === 'Exclusion') {
      this.queryService.setExclusionCriteria(tempcrit);
    }
    //this.switch.emit(this.critGroup);
  }

  public splitInnerArray2(critGroup: string[][], i: number, j: number): string[][] {
    const critGroupTemp: string[][] = [];

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

  public joinInnerArrays2(critGroup: string[][], i: number): string[][] {
    const critGroupTemp: string[][] = [];

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
