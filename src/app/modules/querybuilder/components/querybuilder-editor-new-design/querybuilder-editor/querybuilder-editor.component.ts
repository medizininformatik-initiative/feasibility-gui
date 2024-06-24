import { Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaStageComponent } from '../stage/criteria-stage.component';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  @ViewChild('stage') stage: CriteriaStageComponent;

  query: FeasibilityQuery;

  constructor(public queryService: QueryService) {}

  ngOnInit(): void {
    this.queryService.getFeasibilityQuery().subscribe((query) => {
      this.query = query;
    });
  }

  scroll() {
    if (this.stage) {
      const element = this.stage.elementRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
