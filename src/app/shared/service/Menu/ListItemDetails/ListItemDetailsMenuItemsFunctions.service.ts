import { CreateCriterionService } from 'src/app/service/CriterionService/Builder/CreateCriterion.service';
import { Injectable } from '@angular/core';
import { SearchService } from 'src/app/service/Search/Search.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListItemDetailsMenuItemsFunctionsService {
  constructor(
    private searchService: SearchService,
    private criterionService: CreateCriterionService
  ) {}

  public searchCriteria(id: string) {
    this.searchService.searchCriteriaById(id).pipe(take(1)).subscribe();
  }

  public addToStage(id: string) {
    this.criterionService.getCriteriaProfileData([id]);
  }
}
