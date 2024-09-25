import { ActionBarComponent } from './action-bar/action-bar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CriteriaBoxComponent } from './criteria-box/criteria-box.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemDetailsComponent } from './search-result/list-item-details/list-item-details.component';
import { ListItemDetailsSectionsComponent } from './search-result/list-item-details/list-item-details-sections/list-item-details-sections.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { SearchbarComponent } from './search/searchbar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TranslateModule } from '@ngx-translate/core';
import { TreeComponent } from './tree/tree.component';
import { TableComponent } from './table/table.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { ReferenceCriteriaBoxComponent } from './reference-criteria-box/reference-criteria-box.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ValueSelectComponent } from './value-select/value-select.component';
import { SavedQueryTileComponent } from './saved-query-tile/saved-query-tile.component';
import { HeaderComponent } from './header/header.component';
import { HeaderDescriptionComponent } from './header-description/header-description.component';
import { SectionNameComponent } from './section-name/section-name.component';
import { SwitchComponent } from './switch/switch.component';
import { SpinnerComponent } from './spinner/spinner.component';
const SHARED_DECLARATIONS = [
  ActionBarComponent,
  ButtonComponent,
  CriteriaBoxComponent,
  FilterChipsComponent,
  ListItemDetailsComponent,
  TableComponent,
  SearchbarComponent,
  SearchResultComponent,
  TreeComponent,
  MenuComponent,
  ModalWindowComponent,
  SearchFilterComponent,
  DatePickerComponent,
  ValueSelectComponent,
  SavedQueryTileComponent,
  HeaderComponent,
  HeaderDescriptionComponent,
  SectionNameComponent,
  SwitchComponent,
  SpinnerComponent,
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS,
    ListItemDetailsSectionsComponent,
    SearchFilterComponent,
    CriteriaBoxComponent,
    ActionBarComponent,
    TreeComponent,
    ActionBarComponent,
    MenuComponent,
    ModalWindowComponent,
    ReferenceCriteriaBoxComponent,
    DatePickerComponent,
    ValueSelectComponent,
    SavedQueryTileComponent,
    HeaderComponent,
    HeaderDescriptionComponent,
    SectionNameComponent,
    SwitchComponent,
    SpinnerComponent,
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
