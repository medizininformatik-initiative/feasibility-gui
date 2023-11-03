import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Query } from '../../../model/api/query/query';
import { QueryProviderService } from '../../../service/query-provider.service';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/backend.service';
import { FeatureProviderService } from '../../../service/feature-provider.service';
import { ApiTranslator } from '../../../controller/ApiTranslator';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'num-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss'],
})
export class SingleQueryComponent implements OnInit {
  @Input()
  index: number;

  @Input()
  content: Query;

  @Input()
  isValid: boolean;

  @Input()
  singleQuery;

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

  ngOnInit(): void {
    if (this.isValid === false) {
      this.isInvalid = true;
    }
  }

  loadQuery(): void {
    this.backend.loadQuery(this.singleQuery.id).subscribe((query) => {
      this.query = this.apiTranslator.translateSQtoUIQuery(
        QueryProviderService.createDefaultQuery(),
        query
      );
      this.queryProviderService.store(this.query);
      this.router.navigate(['/querybuilder/editor'], {
        state: { preventReset: true, loadedResult: this.singleQuery },
      });
    });
  }

  deleteQuery(): void {
    this.backend.deleteSavedQuery(this.singleQuery.id).subscribe(() => {
      this.reloadSavedQueries.emit();
    });
  }
}
