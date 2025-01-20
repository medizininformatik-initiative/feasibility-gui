import { Injectable } from '@angular/core';
import { SearchService } from 'src/app/service/Search/Search.service';
import { map, switchMap, switchMapTo, take } from 'rxjs';
import { CreateCriterionService } from '../../../../service/Criterion/Builder/Create/CreateCriterion.service';
import { SearchResultProvider } from 'src/app/service/Search/Result/SearchResultProvider';
import { TableRowDetailsService } from '../../Table/TableRowDetails.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';

@Injectable({
  providedIn: 'root',
})
export class ListItemDetailsMenuItemsFunctionsService {
  constructor(
    private searchService: SearchService,
    private criterionService: CreateCriterionService,
    private test: SearchTermDetailsService
  ) {}

  public showCriteriaInResultList(id: string) {
    this.searchService.searchCriteriaById(id).pipe(take(1)).subscribe();
    this.test.getDetailsForListItem(id).subscribe();
  }

  public addToStage(id: string) {
    this.criterionService.getCriteriaProfileData([id], false);
  }

  public searchCriteria(id: string) {
    this.searchService
      .searchCriteriaById(id)
      .pipe(
        switchMap((criteria) => {
          this.searchService.setActiveCriteriaSearchTerm(
            criteria.getResults()[0].getDisplay().getOriginal()[0]
          );
          return this.searchService.searchCriteria(
            criteria.getResults()[0].getDisplay().getOriginal()[0]
          );
        })
      )
      .subscribe();
  }
}
