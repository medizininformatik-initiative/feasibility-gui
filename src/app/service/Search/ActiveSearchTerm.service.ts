import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveSearchTermService {
  private activeSearchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   *
   * @returns Observable that emits the currently active search term for criteria searches.
   * Default is an empty string if no search term is set.
   */
  public getActiveSearchTerm(): Observable<string> {
    return this.activeSearchTermSubject.asObservable();
  }

  public setActiveSearchTerm(searchText: string): void {
    this.activeSearchTermSubject.next(searchText);
  }
}
