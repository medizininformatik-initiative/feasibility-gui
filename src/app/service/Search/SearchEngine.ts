import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractResultMapper } from './Abstract/AbstractResultMapper';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { FilterProvider } from './Filter/SearchFilterProvider.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';
import { SearchUrlBuilder } from './UrlBuilder/SearchUrlBuilder';
import { ActiveSearchTermService } from './ActiveSearchTerm.service';

@Injectable({
  providedIn: 'root',
})
export class SearchEngine<C extends AbstractListEntry, T extends AbstractResultList<C>> {
  constructor(
    private terminologyApiService: TerminologyApiService,
    private filterProvider: FilterProvider
  ) {}

  public fetchAndMapSearchResults(url: string, mapper: AbstractResultMapper<C, T>): Observable<T> {
    return this.terminologyApiService
      .getElasticSearchResults(url)
      .pipe(map((response) => mapper.mapResponseToResultList(response)));
  }

  public getTerminologyFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.TERMINOLOGY)
      .join(',');
  }

  public getContextFilter(): string {
    return this.filterProvider.getSelectedValuesOfType(ElasticSearchFilterTypes.CONTEXT).join(',');
  }

  public getAvailabilityFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.AVAILABILITY)
      .join(',');
  }

  public getKdsModuleFilter(): string {
    return this.filterProvider
      .getSelectedValuesOfType(ElasticSearchFilterTypes.KDS_MODULE)
      .join(',');
  }
}
