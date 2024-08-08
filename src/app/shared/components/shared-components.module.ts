import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemDetailsComponent } from './search-result/list-item-details/list-item-details.component';
import { ListItemDetailsSectionsComponent } from './search-result/list-item-details/list-item-details-sections/list-item-details-sections.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ResultListComponent } from './search-result/result-list/result-list.component';
import { SearchbarComponent } from './search/searchbar.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { CriteriaBoxComponent } from './criteria-box/criteria-box.component';
import { CriteriaMenuComponent } from './criteria-box/criteria-menu/criteria-menu.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TranslateModule } from '@ngx-translate/core';
import { TreeComponent } from './tree/tree.component';
const SHARED_DECLARATIONS = [
  ActionBarComponent,
  ButtonComponent,
  CriteriaBoxComponent,
  FilterChipsComponent,
  ListItemDetailsComponent,
  ResultListComponent,
  SearchFilterComponent,
  SearchbarComponent,
  SearchResultComponent,
  TreeComponent,
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS,
    ListItemDetailsSectionsComponent,
    SearchFilterComponent,
    CriteriaBoxComponent,
    CriteriaMenuComponent,
    ActionBarComponent,
    TreeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTooltipModule,
  ],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedComponentsModule {}
