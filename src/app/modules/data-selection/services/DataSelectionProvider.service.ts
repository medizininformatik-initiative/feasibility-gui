import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProviderService {
  private dataSelectionUIDMap: Map<string, DataSelection> = new Map();
  private dataSelectionUIDMapSubject: BehaviorSubject<Map<string, DataSelection>> =
    new BehaviorSubject(new Map());

  public getDataSelectionUIDMap(): Observable<Map<string, DataSelection>> {
    return this.dataSelectionUIDMapSubject.asObservable();
  }

  public getDataSelectionMap(): Observable<Map<string, DataSelection>> | undefined {
    return this.dataSelectionUIDMapSubject.asObservable();
  }

  public setDataSelectionByUID(uid: string, dataSelection: DataSelection): void {
    this.dataSelectionUIDMap.set(uid, dataSelection);
    this.dataSelectionUIDMapSubject.next(new Map(this.dataSelectionUIDMap));
  }
}
