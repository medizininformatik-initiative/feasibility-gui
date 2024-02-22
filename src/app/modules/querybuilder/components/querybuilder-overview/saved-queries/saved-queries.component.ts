import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { QueryProviderService } from '../../../service/query-provider.service';
import { BackendService } from '../../../service/backend.service';
import { FeatureProviderService } from '../../../service/feature-provider.service';
import { Subscription } from 'rxjs';
import { IAppConfig } from 'src/app/config/app-config.model';
import { Query } from '../../../../../model/FeasibilityQuery/Query';

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
  invalidQueries = false;
  invalidTemplates = false;
  editModusQuery: Array<boolean> = [];
  editModusTemplate: Array<boolean> = [];

  constructor(
    public queryProviderService: QueryProviderService,
    private backend: BackendService,
    public featureProviderService: FeatureProviderService,
    private changeDetector: ChangeDetectorRef
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
    isValid: boolean
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
  reloadQueries(queryType) {
    if (queryType === 'template') {
      this.loadSavedTemplates();
    } else {
      this.loadSavedQueries();
    }
  }

  loadSavedTemplates(): void {
    this.savedTemplatesSubscription = this.backend
      .loadSavedTemplates(true)
      .subscribe((templates) => {
        this.savedTemplates = [];
        const temp = templates.sort((a, b) => a.id - b.id);
        temp.forEach((template) => {
          if (template.invalidTerms.length > 0) {
            template.isValid = false;
            this.invalidTemplates = true;
          } else {
            template.isValid = true;
          }
          this.savedTemplates.push(template);
        });
      });
  }

  loadSavedQueries(): void {
    this.savedQueriesSubscription = this.backend.loadSavedQueries().subscribe((queries) => {
      this.savedQueries = [];
      const temp = queries.sort((a, b) => a.id - b.id);
      temp.forEach((query) => {
        query.isValid = true;
        this.savedQueries.push(query);
      });
    });
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
  editModeTemplate(mode: boolean, index: number): void {
    this.editModusTemplate[index] = mode;
  }
  editModeQuery(mode: boolean, index: number): void {
    this.editModusQuery[index] = mode;
  }
}
