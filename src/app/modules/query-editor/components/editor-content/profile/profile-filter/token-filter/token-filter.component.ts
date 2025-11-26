import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CriteriaSearchFilterAdapter } from 'src/app/shared/models/SearchFilter/CriteriaSearchFilterAdapter';
import { CriteriaSearchFilter } from 'src/app/model/Search/Filter/CriteriaSearchFilter';
import { ElasticSearchFilterTypes } from 'src/app/model/Utilities/ElasticSearchFilterTypes';
import { CriteriaSearchFilterValue } from 'src/app/model/Search/Filter/CriteriaSearchFilterValue';

@Component({
  selector: 'num-token-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './token-filter.component.html',
  styleUrls: ['./token-filter.component.scss'],
})
export class TokenFilterComponent implements OnInit {
  @Input() tokenFilter: ProfileTokenFilter;
  @Output() tokenFilterChanged = new EventEmitter<ProfileTokenFilter>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Updates the selected concepts in the token filter and emits the updated token filter instance.
   * @param concepts - The updated list of selected concepts.
   */
  public updateSelectedConcepts(concepts: Concept[]): void {
    const newProfileTokenFilter = this.createProfileTokenFilterInstance(concepts);
    this.tokenFilterChanged.emit(newProfileTokenFilter);
  }

  private createProfileTokenFilterInstance(concepts: Concept[]): ProfileTokenFilter {
    return new ProfileTokenFilter(
      this.tokenFilter.getId(),
      this.tokenFilter.getName(),
      this.tokenFilter.getType(),
      this.tokenFilter.getValueSetUrls(),
      concepts
    );
  }
}
