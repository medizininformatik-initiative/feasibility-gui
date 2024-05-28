import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchTermListItemService {
  private selectedRowSource = new BehaviorSubject<any>(null);

  public setSelectedRow(row: any) {
    this.selectedRowSource.next(row);
  }

  public getSelectedRow(): Observable<any> {
    return this.selectedRowSource.asObservable();
  }
}
