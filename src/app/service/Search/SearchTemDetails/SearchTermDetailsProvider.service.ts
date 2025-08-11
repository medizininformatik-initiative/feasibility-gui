import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchTermDetails } from 'src/app/model/Search/SearchDetails/SearchTermDetails';

@Injectable({
  providedIn: 'root',
})
export class SearchTermDetailsProviderService {
  private searchTermDetailsSubject: BehaviorSubject<SearchTermDetails | null> =
    new BehaviorSubject<SearchTermDetails | null>(null);

  constructor() {}

  public getSearchTermDetails$(): Observable<SearchTermDetails | null> {
    return this.searchTermDetailsSubject.asObservable();
  }

  public setSearchTermDetails(details: SearchTermDetails | null) {
    this.searchTermDetailsSubject.next(details);
  }

  public resetSearchTermDetails(): void {
    this.searchTermDetailsSubject.next(null);
  }
}
