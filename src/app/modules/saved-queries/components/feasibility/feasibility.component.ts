import { Component, OnInit } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { first, Observable } from 'rxjs';
import { SavedFeasibilityQueryService } from '../../services/SavedFeasibilityQuery.service';
import { StructuredQuery2FeasibilityQueryService } from '../../../../service/Translator/StructureQuery/StructuredQuery2FeasibilityQuery.service';
import { Router } from '@angular/router';
@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;
  constructor(
    private savedFeasibilityQueryService: SavedFeasibilityQueryService,
    private translator: StructuredQuery2FeasibilityQueryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSavedQueries();
  }

  private loadSavedQueries() {
    this.savedQueries$ = this.savedFeasibilityQueryService.loadSavedQueries();
  }

  public deleteSavedFeasibility(id: string) {
    this.savedFeasibilityQueryService
      .deleteQuery(Number(id))
      .pipe(first())
      .subscribe(() => {
        this.loadSavedQueries();
      });
  }

  loadQueryIntoEditor(id: string) {
    this.savedFeasibilityQueryService
      .loadQueryIntoEditor(Number(id))
      .subscribe((structuredQuery) => {
        console.log(structuredQuery);
        this.translator.translate(structuredQuery.content).subscribe();
        this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
      });
  }
}
