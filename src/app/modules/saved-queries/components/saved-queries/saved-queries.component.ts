import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit {
  queries = [
    {
      title: 'Abfrage-Titel 1',
      description: 'Abfrage-Beschreibung',
      date: new Date('2024-04-08'),
      hasApplication: true,
    },
    {
      title: 'Abfrage-Titel 2',
      description: 'Abfrage-Beschreibung',
      date: new Date('2024-04-08'),
      hasApplication: false,
    },
    {
      title: 'Abfrage-Titel 3',
      description: 'Abfrage-Beschreibung',
      date: new Date('2024-04-08'),
      hasApplication: true,
    },
  ];
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
}
