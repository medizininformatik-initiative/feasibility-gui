import { ActionBarComponent } from './action-bar/action-bar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { CriteriaBoxComponent } from './criteria-box/criteria-box.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FilterChipsComponent } from './filter-chips/filter-chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderDescriptionComponent } from './header-description/header-description.component';
import { ListItemDetailsComponent } from './search-result/list-item-details/list-item-details.component';
import { ListItemDetailsSectionsComponent } from './search-result/list-item-details/list-item-details-sections/list-item-details-sections.component';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from './menu/menu.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { NgModule } from '@angular/core';
import { ReferenceCriteriaBoxComponent } from './reference-criteria-box/reference-criteria-box.component';
import { SavedQueryTileComponent } from './saved-query-tile/saved-query-tile.component';
import { SearchbarComponent } from './search/searchbar.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SectionNameComponent } from './section-name/section-name.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SwitchComponent } from './switch/switch.component';
import { TableComponent } from './table/table.component';
import { TranslateModule } from '@ngx-translate/core';
import { TreeComponent } from './tree/tree.component';
import { ValueSelectComponent } from './value-select/value-select.component';
import { LogicSwitchComponent } from './logic-switch/logic-switch.component';
import { DisplayTranslationPipe } from '../pipes/DisplayTranslationPipe ';
import { SnackbarComponent } from './snack-bar/snackbar.component';
import { BreadcrumbComponent } from './breadcrumbs/breadcrumbs.component';
import { PlaceholderBoxComponent } from './placeholder-box/placeholder-box.component';

const SHARED_DECLARATIONS = [
  ActionBarComponent,
  ButtonComponent,
  CriteriaBoxComponent,
  DatePickerComponent,
  FilterChipsComponent,
  HeaderComponent,
  HeaderDescriptionComponent,
  ListItemDetailsComponent,
  LogicSwitchComponent,
  MenuComponent,
  ModalWindowComponent,
  SavedQueryTileComponent,
  SearchbarComponent,
  SearchFilterComponent,
  SearchResultComponent,
  SectionNameComponent,
  SpinnerComponent,
  SnackbarComponent,
  SwitchComponent,
  TableComponent,
  TreeComponent,
  ValueSelectComponent,
  BreadcrumbComponent,
  PlaceholderBoxComponent,
];

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS,
    ActionBarComponent,
    CriteriaBoxComponent,
    DatePickerComponent,
    HeaderComponent,
    HeaderDescriptionComponent,
    ListItemDetailsSectionsComponent,
    MenuComponent,
    ModalWindowComponent,
    ReferenceCriteriaBoxComponent,
    SavedQueryTileComponent,
    SearchFilterComponent,
    SectionNameComponent,
    SpinnerComponent,
    SnackbarComponent,
    SwitchComponent,
    TreeComponent,
    ValueSelectComponent,
    LogicSwitchComponent,
    BreadcrumbComponent,
    PlaceholderBoxComponent,
  ],
  imports: [
    DisplayTranslationPipe,
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
