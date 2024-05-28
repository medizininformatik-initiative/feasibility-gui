import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTermListItemService {
  private selectedRowSource = new BehaviorSubject<any>(null);
  selectedRow$ = this.selectedRowSource.asObservable();

  setSelectedRow(row: any) {
    this.selectedRowSource.next(row);
  }
}
