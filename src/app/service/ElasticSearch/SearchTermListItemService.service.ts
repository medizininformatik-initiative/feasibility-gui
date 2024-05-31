import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchTermListItem } from '../../model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListItem';

@Injectable({
  providedIn: 'root',
})
export class SearchResultListItemSelectionService {
  private selectedSearchResultListItemSource = new BehaviorSubject<SearchTermListItem>(null);
  private selectedSearchResultListItemsSource = new BehaviorSubject<SearchTermListItem[]>([]);

  /**
   * Sets the current selected search term result item and adds it to the selection.
   *
   * @param item The searchTermListItem to be set as selected.
   */
  public setSelectedSearchResultListItem(item: SearchTermListItem): void {
    this.selectedSearchResultListItemSource.next(item);
    this.addSearchResultListItemToSelection(item);
  }

  /**
   * Gets the currently selected search term result item as an observable.
   *
   * @returns An Observable of the currently selected SearchTermListItem.
   */
  public getSelectedSearchResultListItem(): Observable<SearchTermListItem> {
    return this.selectedSearchResultListItemSource.asObservable();
  }

  /**
   * Gets the list of all selected search term result items as an observable.
   *
   * @returns An Observable of an array of selected SearchTermListItems.
   */
  public getSelectedSearchResultListItems(): Observable<SearchTermListItem[]> {
    return this.selectedSearchResultListItemsSource.asObservable();
  }

  /**
   * Adds a search term result item to the current selection if it is not already included.
   *
   * @param item The SearchTermListItem to be added to the selection.
   */
  public addSearchResultListItemToSelection(item: SearchTermListItem): void {
    const currentSelection = this.selectedSearchResultListItemsSource.getValue();
    if (!currentSelection.includes(item)) {
      this.selectedSearchResultListItemsSource.next([...currentSelection, item]);
    }
  }

  /**
   * Removes a search term result item from the current selection.
   *
   * @param item The SearchTermListItem to be removed from the selection.
   */
  public removeSearchResultListItemFromSelection(item: SearchTermListItem): void {
    const currentSelection = this.selectedSearchResultListItemsSource.getValue();
    this.selectedSearchResultListItemsSource.next(
      currentSelection.filter((resultItem) => resultItem !== item)
    );
  }

  /**
   * Clears the current selection of all search term result items.
   */
  public clearSelection(): void {
    this.selectedSearchResultListItemsSource.next([]);
  }
}
