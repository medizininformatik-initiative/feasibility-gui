import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';

@Injectable({
  providedIn: 'root',
})
export class SearchResultListItemSelectionService<T extends InterfaceListEntry> {
  private selectedSearchResultListItemSource = new BehaviorSubject<T | null>(null);
  private selectedSearchResultListItemsSource = new BehaviorSubject<T[]>([]);
  private ids: Set<string> = new Set<string>();

  /**
   * Sets the current selected search term result item
   * This function is made for calling the details when a row is selected
   *
   * @todo needs to be renamed
   *
   * @param item The ListEntry to be set as selected.
   */
  public setSelectedSearchResultListItem(item: T): void {
    this.selectedSearchResultListItemSource.next(item);
  }

  /**
   * Gets the currently selected search term result item as an observable.
   *
   * @returns An Observable of the currently selected ListEntry.
   */
  public getSelectedSearchResultListItem(): Observable<T | null> {
    return this.selectedSearchResultListItemSource.asObservable();
  }

  /**
   * Gets the list of all selected search term result items as an observable.
   *
   * @returns An Observable of an array of selected ListEntry.
   */
  public getSelectedSearchResultListItems(): Observable<T[]> {
    return this.selectedSearchResultListItemsSource.asObservable();
  }

  /**
   * Gets the IDs of all selected items.
   *
   * @returns An array of IDs.
   */
  public getIds(): string[] {
    return Array.from(this.ids);
  }

  /**
   * Adds a search term result item to the current selection if it is not already included.
   *
   * @param item The ListEntry to be added to the selection.
   */
  public addSearchResultListItemToSelection(item: T): void {
    const currentSelection = this.selectedSearchResultListItemsSource.getValue();
    if (!currentSelection.includes(item)) {
      this.selectedSearchResultListItemsSource.next([...currentSelection, item]);
      this.ids.add(item.getId());
    }
  }

  /**
   * Removes a search term result item from the current selection.
   *
   * @param item The ListEntry to be removed from the selection.
   */
  public removeSearchResultListItemFromSelection(item: T): void {
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
