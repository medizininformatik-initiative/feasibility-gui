import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit {
  savedQueries$: Observable<any>;
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.loadSavedQueries();
  }

  private loadSavedQueries() {
    this.savedQueries$ = this.backendService
      .loadSavedQueries()
      .pipe(map((query) => query.sort((a, b) => a.id - b.id)));
  }

  deleteQuery(id: number): void {
    this.backendService.deleteSavedQuery(id).subscribe(() => {
      this.loadSavedQueries();
    });
  }

  loadQueryIntoEditor(id: number) {
    this.backendService.loadStructuredQuery(id).subscribe();
  }
}
