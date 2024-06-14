import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../criteria/criteria.component';
import { QueryService } from 'src/app/service/QueryService.service';
import { Query } from 'src/app/model/FeasibilityQuery/Query';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  @ViewChild('stage') stage: CriteriaComponent;

  query: Query;

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
