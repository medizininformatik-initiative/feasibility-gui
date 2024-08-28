import { CriteriaStageComponent } from '../stage/criteria-stage.component';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { SearchComponent } from '../search/search.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  @ViewChild('stage') stage: CriteriaStageComponent;
  @ViewChild('search') search: SearchComponent;

  query: FeasibilityQuery;
  constructor(
    public queryService: FeasibilityQueryProviderService,
    private test1: TerminologySystemProvider
  ) {}

  ngOnInit(): void {
    this.queryService.getFeasibilityQueryByID().subscribe((query) => {
      this.query = query.get('1');
    });
    setTimeout(() => {
      if (window.history.state.jumpToStage) {
        this.scroll(true);
        //window.history.state.jumpToStage = false
      }
    }, 100);
  }

  scroll(event: boolean) {
    if (event) {
      if (this.stage) {
        const element = this.stage.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (this.search) {
        const element = this.search.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
