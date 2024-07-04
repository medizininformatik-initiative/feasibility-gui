import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InterfaceTableDataRow } from 'src/app/model/TableData/InterfaceTableDataRows';
import { InterfaceListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/InterfaceListEntry';

@Injectable({
  providedIn: 'root',
})
export class SelectedTableItemsService<T extends InterfaceListEntry> {
  private selectedTableItemSource = new BehaviorSubject<T | null>(null);
  private selectedTableItemsSource = new BehaviorSubject<T[]>([]);
  private ids: Set<string> = new Set<string>();

  /**
   * Sets the current selected table item.
   *
   * @param item The table row data to be set as selected.
   */
  public setSelectedTableItem(item: T): void {
    this.selectedTableItemSource.next(item);
    this.addToSelection(item);
  }

  /**
   * Gets the currently selected table item as an observable.
   *
   * @returns An Observable of the currently selected table row data.
   */
  public getSelectedTableItem(): Observable<T | null> {
    return this.selectedTableItemSource.asObservable();
  }

  /**
   * Gets the list of all selected table items as an observable.
   *
   * @returns An Observable of an array of selected table row data.
   */
  public getSelectedTableItems(): Observable<T[]> {
    return this.selectedTableItemsSource.asObservable();
  }

  public getCurrentSelectedTableItem(): T | null {
    return this.selectedTableItemSource.getValue();
  }

  /**
   * Gets the IDs of all selected items.
   *
   * @returns An array of IDs.
   */
  public getSelectedIds(): string[] {
    return Array.from(this.ids);
  }

  /**
   * Adds a table row data item to the current selection if it is not already included.
   *
   * @param item The table row data to be added to the selection.
   */
  public addToSelection(item: T): void {
    const currentSelection = this.selectedTableItemsSource.getValue();
    if (!currentSelection.some((entry) => entry.id === item.id)) {
      this.selectedTableItemsSource.next([...currentSelection, item]);
      this.ids.add(item.id);
    }
  }

  /**
   * Removes a table row data item from the current selection.
   *
   * @param item The table row data to be removed from the selection.
   */
  public removeFromSelection(item: T): void {
    const currentSelection = this.selectedTableItemsSource.getValue();
    const updatedSelection = currentSelection.filter((entry) => entry.id !== item.id);
    this.selectedTableItemsSource.next(updatedSelection);
    this.ids.delete(item.id);
  }

  /**
   * Clears the current selection of all table row data items.
   */
  public clearSelection(): void {
    this.selectedTableItemsSource.next([]);
    this.ids.clear();
  }
}
