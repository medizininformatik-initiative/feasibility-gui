import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataQueryStorageService } from 'src/app/service/DataQuery/DataQueryStorage.service';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { SavedFeasibilityQueryAdapter } from 'src/app/shared/models/SavedQueryTile/SavedFeasibilityQueryAdapter';
import { SavedDataQueryListItem } from 'src/app/model/SavedDataQuery/SavedDataQueryListItem';
import { SavedQueryType } from 'src/app/model/Types/SavedQuery';
import { SavedDataQueryListItemData } from '../model/Interface/SavedDataQueryListItemData';

@Injectable({
  providedIn: 'root',
})
export class SavedQueryGroupingService {
  private queryCategories: SavedQueryType[] = [
    { title: 'cohort', length: 0, data: [] },
    { title: 'dataselection', length: 0, data: [] },
    { title: 'datadefinition', length: 0, data: [] },
  ];

  constructor(private dataQueryStorageService: DataQueryStorageService) {}

  public getTotalSavedQueriesLength(): number {
    return this.queryCategories.reduce((sum, category) => sum + category.length, 0);
  }

  public categorizeSavedDataQueries(
    savedQueries: Observable<SavedDataQueryListItemData[]>
  ): Observable<SavedQueryType[]> {
    return savedQueries.pipe(
      map((queries) => {
        const categorizedData = {
          cohort: this.getCohortDefinitions(queries),
          dataselection: this.getDataSelections(queries),
          datadefinition: this.getDataDefinitions(queries),
        };

        this.queryCategories.forEach((category) => {
          category.data = categorizedData[category.title as keyof typeof categorizedData] || [];
          category.length = category.data.length;
        });

        return this.queryCategories;
      }),
      catchError((error) => {
        console.error('Error loading saved queries:', error);
        return of(this.queryCategories);
      })
    );
  }

  private getCohortDefinitions(queries: any[]): InterfaceSavedQueryTile[] {
    return this.filterAndAdaptQueries(
      queries,
      (query) => query.ccdl.exists && !query.dataExtraction.exists
    );
  }

  private getDataSelections(queries: any[]): InterfaceSavedQueryTile[] {
    return this.filterAndAdaptQueries(
      queries,
      (query) => !query.ccdl.exists && query.dataExtraction.exists
    );
  }

  private getDataDefinitions(queries: any[]): InterfaceSavedQueryTile[] {
    return this.filterAndAdaptQueries(
      queries,
      (query) => query.ccdl.exists && query.dataExtraction.exists
    );
  }

  private filterAndAdaptQueries(
    queries: any[],
    filterFn: (query: any) => boolean
  ): InterfaceSavedQueryTile[] {
    return queries.filter(filterFn).map(this.adaptQuery);
  }

  private adaptQuery(query: any): InterfaceSavedQueryTile {
    return SavedFeasibilityQueryAdapter.adapt(SavedDataQueryListItem.fromJson(query));
  }
}
