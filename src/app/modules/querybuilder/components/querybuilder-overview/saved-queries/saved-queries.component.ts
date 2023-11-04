import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { QueryProviderService } from '../../../service/query-provider.service';
import { Router } from '@angular/router';
import { BackendService } from '../../../service/backend.service';
import { FeatureService } from 'src/app/service/feature.service';
import { FeatureProviderService } from '../../../service/feature-provider.service';
import { ApiTranslator } from '../../../controller/ApiTranslator';
import { Subscription } from 'rxjs';
import { Query } from '../../../model/api/query/query';
import { IAppConfig } from 'src/app/config/app-config.model';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit, OnDestroy, AfterViewChecked {
  private features: IAppConfig;

  queryVersion: string;
  importQuery: Query;
  actionDisabled: boolean;

  constructor(
    public queryProviderService: QueryProviderService,
    private router: Router,
    private backend: BackendService,
    private feature: FeatureService,
    public featureProviderService: FeatureProviderService,
    private changeDetector: ChangeDetectorRef,
    private apiTranslator: ApiTranslator
  ) {}

  private savedQueriesSubscription: Subscription;
  private savedTemplatesSubscription: Subscription;
  private singleQuerySubscription: Subscription;
  private singleTemplateSubscription: Subscription;

  query: Query;
  title = '';
  comment = '';

  savedQueries: Array<{
    id: number
    label: string
    created_at: Date
  }> = [];

  savedTemplates: Array<{
    id?: number
    content?: Query
    label: string
    comment: string
    lastModified: Date
    createdBy?: string
    isValid?: boolean
  }> = [];

  fileName: string;

  ngOnInit(): void {
    this.query = this.queryProviderService.query();
    this.savedQueriesSubscription?.unsubscribe();
    this.savedTemplatesSubscription?.unsubscribe();
    this.singleQuerySubscription?.unsubscribe();
    this.singleTemplateSubscription?.unsubscribe();
    this.loadSavedQueries();
    this.loadSavedTemplates();
    this.features = this.featureProviderService.getFeatures();
    this.queryVersion = this.features.queryVersion;
  }

  ngOnDestroy(): void {
    this.singleTemplateSubscription?.unsubscribe();
    this.savedQueriesSubscription?.unsubscribe();
    this.savedTemplatesSubscription?.unsubscribe();
    this.singleQuerySubscription?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (this.importQuery) {
      this.actionDisabled = false;
    } else {
      this.actionDisabled = true;
    }
    this.changeDetector.detectChanges();
  }

  loadSavedTemplates(): void {
    this.savedTemplatesSubscription = this.backend.loadSavedTemplates().subscribe((templates) => {
      this.savedTemplates = templates;
    });
  }

  loadSavedQueries(): void {
    this.savedQueriesSubscription = this.backend.loadSavedQueries().subscribe((queries) => {
      this.savedQueries = queries;
    });
  }

  loadQueryIntoFeasibilityPage(singleQuery): void {
    if (this.feature.mockLoadnSave()) {
      this.query = singleQuery;
      this.storeQueryAndNavigate();
    }
    this.backend.loadQuery(singleQuery.id).subscribe((query) => {
      this.createDefaultQuery(query);
      this.storeQueryAndNavigate();
    });
  }

  loadTemplateIntoFeasibilityPage(singleTemplate): void {
    if (this.feature.mockLoadnSave()) {
      this.query = singleTemplate;
      this.storeQueryAndNavigate();
    } else {
      this.backend.loadTemplate(singleTemplate.id).subscribe((query) => {
        this.createDefaultQuery(query);
        this.storeQueryAndNavigate();
      });
    }
  }

  createDefaultQuery(query) {
    this.query = this.apiTranslator.translateSQtoUIQuery(
      QueryProviderService.createDefaultQuery(),
      query
    );
  }

  storeQueryAndNavigate() {
    this.queryProviderService.store(this.query);
    this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } });
  }

  doValidate(): void {
    this.savedTemplatesSubscription = this.backend.loadSavedTemplates(true).subscribe((queries) => {
      this.savedTemplates = queries;
    });
  }

  deleteQuery(id: number): void {
    this.backend.deleteSavedQuery(id).subscribe(() => {
      this.loadSavedQueries();
    });
  }

  deleteTemplate(id: number) {
    this.backend.deleteSavedTemplate(id).subscribe(() => {
      this.loadSavedTemplates();
    });
  }
}
