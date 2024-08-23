import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedConceptFilterComponent } from './components/shared-concept-filter/shared-concept-filter.component';
import { StagedConceptsComponent } from './components/shared-concept-filter/staged-concepts/staged-concepts.component';
import { ConceptFilterTableComponent } from './components/shared-concept-filter/concept-filter-table/concept-filter-table.component';
import { SearchConceptComponent } from './components/shared-concept-filter/search-concept/search-concept.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ElasticSearchService } from 'src/app/service/ElasticSearch/ElasticSearch.service';
import { mapToCodeableConceptResultList } from 'src/app/service/ElasticSearch/ListEntry/ListEntryMappingFunctions';
import { ConceptElasticSearchService } from './service/ConceptFilter/ConceptElasticSearch.service';

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
