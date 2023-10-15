import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTranslator } from 'src/app/modules/querybuilder/controller/ApiTranslator';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { FeatureProviderService } from 'src/app/modules/querybuilder/service/feature-provider.service';
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service';
import { Query } from 'src/app/modules/querybuilder/model/api/query/query';
@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent {
  @Input()
  index: number;

  @Input()
  content: Query;

  @Input()
  id: number;

  @Input()
  isValid: boolean;

  @Input()
  singleLabel: string;

  @Input()
  singleComment: string;

  @Input()
  singleDate: Date;

  @Input()
  createdBy: string;

  @Output()
  reloadSavedQueries = new EventEmitter<boolean>();

  isInvalid: boolean;

  queryVersion: string;
  importQuery: Query;
  actionDisabled: boolean;

  query: Query;
  constructor(
    public queryProviderService: QueryProviderService,
    private router: Router,
    private backend: BackendService,
    public featureProviderService: FeatureProviderService,
    private apiTranslator: ApiTranslator
  ) {}

  loadQuery(): void {
    this.backend.loadQuery(this.id).subscribe((query) => {
      this.query = this.apiTranslator.translateSQtoUIQuery(
        QueryProviderService.createDefaultQuery(),
        query
      );
      this.queryProviderService.store(this.query);
      this.router.navigate(['/querybuilder/editor'], {
        state: { preventReset: true, loadedResult: query.results },
      });
    });
  }

  deleteQuery(): void {
    this.backend.deleteSavedQuery(this.id).subscribe(() => {
      this.reloadSavedQueries.emit();
    });
  }
}
