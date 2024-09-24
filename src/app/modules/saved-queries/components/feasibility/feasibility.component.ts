import { Component, OnInit } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { first, Observable } from 'rxjs';
import { SavedFeasibilityQueryService } from '../../services/SavedFeasibilityQuery.service';

@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;
  constructor(private savedFeasibilityQueryService: SavedFeasibilityQueryService) {}

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
    this.savedFeasibilityQueryService.loadQueryIntoEditor(Number(id));
  }
}
