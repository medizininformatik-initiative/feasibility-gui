import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Query } from '../../../model/api/query/query';
import { QueryProviderService } from '../../../service/query-provider.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/backend.service';
import { FeatureService } from 'src/app/service/feature.service';
import { FeatureProviderService } from '../../../service/feature-provider.service';
import { ApiTranslator } from '../../../controller/ApiTranslator';
import { IAppConfig } from 'src/app/config/app-config.model';
import { Subscription } from 'rxjs';
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
    private changeDetection: ChangeDetectorRef,

    public queryProviderService: QueryProviderService,
    private router: Router,
    private backend: BackendService,
    private feature: FeatureService,
    public featureProviderService: FeatureProviderService,
    private apiTranslator: ApiTranslator
  ) {}

  private savedQueriesSubscription: Subscription;
  private savedTemplatesSubscription: Subscription;
  private singleQuerySubscription: Subscription;
  private singleTemplateSubscription: Subscription;

  ngOnInit(): void {
    if (this.isValid === false) {
      this.isInvalid = true;
    }
  }

  loadQuery(): void {
    this.singleQuerySubscription = this.backend.loadQuery(this.id).subscribe((query) => {
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
    const response = this.backend.deleteQuery(this.id).subscribe();
    this.reloadSavedQueries.emit();
    this.changeDetection.detectChanges();
    console.log(response);
  }
}
