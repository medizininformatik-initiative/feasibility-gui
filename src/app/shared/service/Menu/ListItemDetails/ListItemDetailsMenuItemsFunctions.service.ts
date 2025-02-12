import { CreateCriterionService } from '../../../../service/Criterion/Builder/Create/CreateCriterion.service';
import { Injectable } from '@angular/core';
import { SearchService } from 'src/app/service/Search/Search.service';
import { SearchTermDetailsService } from 'src/app/service/Search/SearchTemDetails/SearchTermDetails.service';
import { SearchTermResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/SearchTermResultList';
import { switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListItemDetailsMenuItemsFunctionsService {
  constructor(
    private searchService: SearchService,
    private criterionService: CreateCriterionService,
    private searchTermDetailsService: SearchTermDetailsService
  ) {}

  public showCriteriaInResultList(id: string) {
    this.searchService.searchCriteriaById(id).pipe(take(1)).subscribe();
    this.searchTermDetailsService.getDetailsForListItem(id).pipe(take(1)).subscribe();
  }

  public addToStage(id: string) {
    this.criterionService.getCriteriaProfileData([id], false);
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
