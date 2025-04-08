import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { FilterChipDataSelectionAdapter } from 'src/app/shared/models/FilterChips/Adapter/DataSelection/FilterChipDataSelectionAdapter';
import { Injectable } from '@angular/core';
import { InterfaceFilterChip } from '../../../models/FilterChips/InterfaceFilterChip';
import { TranslateService } from '@ngx-translate/core';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { SelectedField } from 'src/app/model/DataSelection/Profile/Fields/SelectedField';

@Injectable({
  providedIn: 'root',
})
export class DataSelectionFieldsChipsService {
  private filterChipsSubject: BehaviorSubject<InterfaceFilterChip[]> = new BehaviorSubject<
    InterfaceFilterChip[]
  >([]);
  filterChips$: Observable<InterfaceFilterChip[]> = this.filterChipsSubject.asObservable();

  constructor(public translate: TranslateService) {}

  public generateFilterChipsFromDataSelectionFields(
    selectedFields: SelectedField[]
  ): Observable<InterfaceFilterChip[]> {
    const filterChips = FilterChipDataSelectionAdapter.adaptFields(selectedFields);
    const squashedFilterChips = this.squashFilterChips(filterChips);
    this.filterChipsSubject.next(squashedFilterChips);
    return this.filterChipsSubject.asObservable();
  }

  private squashFilterChips(filterChips: InterfaceFilterChip[]): InterfaceFilterChip[] {
    const squashedChipsMap = new Map<
      Display | FilterTypes | TimeRestrictionType | string,
      InterfaceFilterChip
    >();

    filterChips.forEach((chip) => {
      if (!squashedChipsMap.has(chip.type)) {
        squashedChipsMap.set(chip.type, {
          type: chip.type,
          data: [...chip.data],
        });
      } else {
        const existingChip = squashedChipsMap.get(chip.type);
        existingChip?.data.push(...chip.data);
      }
    });

    return Array.from(squashedChipsMap.values());
  }
}
