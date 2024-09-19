import { CommonModule } from '@angular/common';
import { ConceptFilterTableComponent } from './components/shared-concept-filter/concept-filter-table/concept-filter-table.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { NgModule } from '@angular/core';
import { SearchConceptComponent } from './components/shared-concept-filter/search-concept/search-concept.component';
import { SharedConceptFilterComponent } from './components/shared-concept-filter/shared-concept-filter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagedConceptsComponent } from './components/shared-concept-filter/staged-concepts/staged-concepts.component';

@NgModule({
  declarations: [
    SharedConceptFilterComponent,
    StagedConceptsComponent,
    ConceptFilterTableComponent,
    SearchConceptComponent,
  ],
  imports: [CommonModule, LayoutModule, SharedModule],
  exports: [SharedConceptFilterComponent],
})
export class SharedFilterModule {}
