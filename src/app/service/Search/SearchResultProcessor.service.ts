import { AbstractListEntry } from 'src/app/shared/models/ListEntries/AbstractListEntry';
import { AbstractResultList } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ResultList/AbstractResultList';
import { AbstractResultMapper } from './AbstractResultMapper';
import { Injectable } from '@angular/core';
import { InterfaceUrlBuilder } from '../Backend/UrlBuilder/InterfaceUrlBuilder';
import { map, Observable } from 'rxjs';
import { TerminologyApiService } from '../Backend/Api/TerminologyApi.service';

@Injectable({
  providedIn: 'root',
})
export class SearchResultProcessorService<
  C extends AbstractListEntry,
  T extends AbstractResultList<C>
> {
  constructor(private terminologyApiService: TerminologyApiService) {}

  public fetchAndMapSearchResults(
    urlBuilder: InterfaceUrlBuilder,
    mapper: AbstractResultMapper<C, T>
  ): Observable<T> {
    return this.terminologyApiService
      .getElasticSearchResults(urlBuilder.buildUrl())
      .pipe(map((response) => mapper.mapResponseToResultList(response)));
  }
}
