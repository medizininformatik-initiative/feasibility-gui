import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { FilterChipDataSelectionAdapter } from 'src/app/shared/models/FilterChips/Adapter/DataSelection/FilterChipDataSelectionAdapter';
import { Injectable } from '@angular/core';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionFilterChipsService {
  private filterChipsSubject: BehaviorSubject<InterfaceFilterChip[]> = new BehaviorSubject<
    InterfaceFilterChip[]
  >([]);
  filterChips$: Observable<InterfaceFilterChip[]> = this.filterChipsSubject.asObservable();

  constructor() {}

  public generateFilterChipsFromDataSelectionFields(
    dataSelectionProfileProfileNode: ProfileFields[]
  ): Observable<InterfaceFilterChip[]> {
    const filterChips = FilterChipDataSelectionAdapter.adaptFields(dataSelectionProfileProfileNode);
    const squashedFilterChips = this.squashFilterChips(filterChips);
    this.filterChipsSubject.next(squashedFilterChips);
    return this.filterChipsSubject.asObservable();
  }

  private squashFilterChips(filterChips: InterfaceFilterChip[]): InterfaceFilterChip[] {
    const squashedChipsMap: { [key: string]: InterfaceFilterChip } = {};

    filterChips.forEach((chip) => {
      if (!squashedChipsMap[chip.type]) {
        squashedChipsMap[chip.type] = {
          type: chip.type,
          data: [...chip.data],
        };
      } else {
        squashedChipsMap[chip.type].data.push(...chip.data);
      }
    });
    return Object.values(squashedChipsMap);
  }
}
