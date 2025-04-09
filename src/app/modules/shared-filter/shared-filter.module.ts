import { CommonModule } from '@angular/common';
import { ConceptFilterTableComponent } from './components/shared-concept-filter/concept-filter-table/concept-filter-table.component';
import { EditFieldsComponent } from './components/edit-fields/edit-fields.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { NgModule } from '@angular/core';
import { SearchConceptComponent } from './components/shared-concept-filter/search-concept/search-concept.component';
import { SharedConceptFilterComponent } from './components/shared-concept-filter/shared-concept-filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagedConceptsComponent } from './components/shared-concept-filter/staged-concepts/staged-concepts.component';
import { StagedConceptsComponentCopy } from './components/shared-concept-filter copy/staged-concepts/copy_staged-concepts.component';
import { CopyConceptFilterTableComponent } from './components/shared-concept-filter copy/concept-filter-table/copy_concept-filter-table.component';
import { CopySearchConceptComponent } from './components/shared-concept-filter copy/search-concept/copy_search-concept.component';
import { CopySharedConceptFilterComponent } from './components/shared-concept-filter copy/copy_shared-concept-filter.component';

@NgModule({
  declarations: [
    SharedConceptFilterComponent,
    StagedConceptsComponent,
    ConceptFilterTableComponent,
    SearchConceptComponent,
    EditFieldsComponent,
    StagedConceptsComponentCopy,
    CopyConceptFilterTableComponent,
    CopySearchConceptComponent,
    CopySharedConceptFilterComponent,
  ],
  imports: [CommonModule, LayoutModule, SharedModule],
  exports: [SharedConceptFilterComponent, EditFieldsComponent, CopySharedConceptFilterComponent],
})
export class SharedFilterModule {}
