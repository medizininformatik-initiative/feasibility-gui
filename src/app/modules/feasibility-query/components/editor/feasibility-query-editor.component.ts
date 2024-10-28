import { CriteriaStageComponent } from './stage/criteria-stage.component';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'num-feasibility-query-editor',
  templateUrl: './feasibility-query-editor.component.html',
  styleUrls: ['./feasibility-query-editor.component.scss'],
})
export class FeasibilityQueryEditorComponent implements OnInit {
  @ViewChild('stage') stage: CriteriaStageComponent;
  @ViewChild('search') search: SearchComponent;

  query: FeasibilityQuery;
  constructor(
    public queryService: FeasibilityQueryProviderService,
    private test1: TerminologySystemProvider
  ) {}

  ngOnInit(): void {
    this.queryService.getActiveFeasibilityQuery().subscribe((query) => {
      this.query = query;
    });
  }
}
