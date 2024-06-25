import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeableConceptResultListEntry } from 'src/app/model/ElasticSearch/ElasticSearchResult/ElasticSearchList/ListEntries/CodeableConceptResultListEntry';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';

@Component({
  selector: 'num-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent {
  listItems: CodeableConceptResultListEntry[] = [];
  private subscription: Subscription;

  constructor(private backend: BackendService) {}

  startElasticSearch(test: string) {}
}
