import { BehaviorSubject, Observable } from 'rxjs';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionProfileProviderService {
  private dataSelectionProfileUrlMap: Map<string, DataSelectionProfileProfile> = new Map();
  private dataSelectionProfileUrlMapSubject: BehaviorSubject<
    Map<string, DataSelectionProfileProfile>
  > = new BehaviorSubject(new Map());

  constructor() {}

  public getDataSelectionProfileUrlMap(): Observable<Map<string, DataSelectionProfileProfile>> {
    return this.dataSelectionProfileUrlMapSubject.asObservable();
  }

  public getDataSelectionProfileByUrl(url: string): DataSelectionProfileProfile | undefined {
    return this.dataSelectionProfileUrlMap.get(url);
  }

  public setDataSelectionProfileByUrl(url: string, profile: DataSelectionProfileProfile): void {
    this.dataSelectionProfileUrlMap.set(url, profile);
    this.dataSelectionProfileUrlMapSubject.subscribe((test) => console.log(test));
    this.dataSelectionProfileUrlMapSubject.next(new Map(this.dataSelectionProfileUrlMap));
  }

  public removeDataSelectionProfileByUrl(url: string): void {
    if (this.dataSelectionProfileUrlMap.has(url)) {
      this.dataSelectionProfileUrlMap.delete(url);
      this.dataSelectionProfileUrlMapSubject.next(new Map(this.dataSelectionProfileUrlMap));
    }
  }
}
