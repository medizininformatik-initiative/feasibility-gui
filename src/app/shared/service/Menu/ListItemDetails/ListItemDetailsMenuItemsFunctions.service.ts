import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { FeasibilityQueryProviderHub } from 'src/app/service/Provider/FeasibilityQueryProviderHub';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs';
import { NewCreateCriterionService } from 'src/app/service/Criterion/Builder/Create/NewCreateCriterion.service';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';

@Injectable({
  providedIn: 'root',
})
export class ListItemDetailsMenuItemsFunctionsService {
  constructor(
    private searchService: SearchService,
    private criterionService: NewCreateCriterionService,
    private searchTermDetailsService: SearchTermDetailsService,
    private feasibilityQueryProviderHub: FeasibilityQueryProviderHub
  ) {}

  public showCriteriaInResultList(id: string) {
    this.searchService.searchCriteriaById(id).pipe(take(1)).subscribe();
    this.searchTermDetailsService.getDetailsForListItem(id).pipe(take(1)).subscribe();
  }

  public addToStage(id: string) {
    this.criterionService
      .createCriteriaFromHashes([id])
      .pipe(
        map((criteria: Criterion[]) => {
          this.feasibilityQueryProviderHub.addCriteriaToCriterionProvider(criteria);
          this.feasibilityQueryProviderHub.addCriteriaToStage(criteria);
        })
      )
      .subscribe();
  }

  public searchCriteria(id: string) {
    this.searchService
      .searchCriteriaById(id)
      .pipe(
        take(1),
        switchMap((searchTermResultList: SearchTermResultList) => {
          this.searchService.setActiveCriteriaSearchTerm(
            searchTermResultList.getResults()[0].getDisplay().getOriginal()
          );
          return this.searchService.searchCriteria(
            searchTermResultList.getResults()[0].getDisplay().getOriginal()
          );
        })
      )
      .subscribe();
  }
}
