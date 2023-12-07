import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { QueryProviderService } from '../../service/query-provider.service';
import { Query } from '../../model/api/query/query';
import { Router } from '@angular/router';
import { BackendService } from '../../service/backend.service';
import { Subscription } from 'rxjs';
import { FeatureService } from '../../../../service/feature.service';
import { ApiTranslator } from '../../controller/ApiTranslator';
import { FeatureProviderService } from '../../service/feature-provider.service';
import { IAppConfig } from '../../../../config/app-config.model';
import { TerminologyCode } from '../../model/api/terminology/terminology';

@Component({
  selector: 'num-querybuilder-overview',
  templateUrl: './querybuilder-overview.component.html',
  styleUrls: ['./querybuilder-overview.component.scss'],
})
export class QuerybuilderOverviewComponent implements OnInit, OnDestroy, AfterViewChecked {
  private features: IAppConfig;
  queryVersion: string;
  importQuery: Query;
  actionDisabled: boolean;

  constructor(
    public queryProviderService: QueryProviderService,
    private router: Router,
    private backend: BackendService,
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
    invalidTerms?: Array<TerminologyCode>
  }> = [];

  fileName: string;

  ngOnInit(): void {
    this.query = this.queryProviderService.query();
    this.savedQueriesSubscription?.unsubscribe();
    this.savedTemplatesSubscription?.unsubscribe();
    this.singleQuerySubscription?.unsubscribe();
    this.singleTemplateSubscription?.unsubscribe();
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

  doImportFromFile(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(file);
    this.fileName = file.name;
  }

  onReaderLoad(event): void {
    this.importQuery = JSON.parse(event.target.result);
  }

  doImport(): void {
    this.createDefaultQuery(this.importQuery);
    this.storeQueryAndNavigate();
  }

  createDefaultQuery(query) {
    this.query = this.apiTranslator.translateImportedSQtoUIQuery(
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
      queries.forEach((template) => {
        if (template.invalidTerms.length > 0) {
          template.isValid = false;
        } else {
          template.isValid = true;
        }
        this.savedTemplates.push(template);
      });
    });
  }
}
