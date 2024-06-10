import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchTermListEntry } from '../../model/ElasticSearch/ElasticSearchResult/ElasticSearchList/SearchTermListEntry';

@Injectable({
  providedIn: 'root',
})
export class SearchResultListItemSelectionService {
  private selectedSearchResultListItemSource = new BehaviorSubject<SearchTermListEntry>(null);
  private selectedSearchResultListItemsSource = new BehaviorSubject<SearchTermListEntry[]>([]);

  /**
   * Sets the current selected search term result item
   * This functions is made for calling the details when a row is selected
   *
   * @todo needs to be remamed
   *
   * @param item The SearchTermListEntry to be set as selected.
   */
  public setSelectedSearchResultListItem(item: SearchTermListEntry): void {
    this.selectedSearchResultListItemSource.next(item);
  }

  /**
   * Gets the currently selected search term result item as an observable.
   *
   * @returns An Observable of the currently selected SearchTermListEntry.
   */
  public getSelectedSearchResultListItem(): Observable<SearchTermListEntry> {
    return this.selectedSearchResultListItemSource.asObservable();
  }

  /**
   * Gets the list of all selected search term result items as an observable.
   *
   * @returns An Observable of an array of selected SearchTermListEntry.
   */
  public getSelectedSearchResultListItems(): Observable<SearchTermListEntry[]> {
    return this.selectedSearchResultListItemsSource.asObservable();
  }

  /**
   * Adds a search term result item to the current selection if it is not already included.
   *
   * @param item The SearchTermListEntry to be added to the selection.
   */
  public addSearchResultListItemToSelection(item: SearchTermListEntry): void {
    const currentSelection = this.selectedSearchResultListItemsSource.getValue();
    if (!currentSelection.includes(item)) {
      this.selectedSearchResultListItemsSource.next([...currentSelection, item]);
    }
  }

  /**
   * Removes a search term result item from the current selection.
   *
   * @param item The SearchTermListEntry to be removed from the selection.
   */
  public removeSearchResultListItemFromSelection(item: SearchTermListEntry): void {
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
