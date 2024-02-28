import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQueryTemplate } from 'src/app/model/FeasibilityQuery/FeasibilityQueryTemplate';
import { FeatureProviderService } from '../../../service/feature-provider.service';
import { IAppConfig } from 'src/app/config/app-config.model';
import { Query } from '../../../../../model/FeasibilityQuery/Query';
import { QueryProviderService } from '../../../service/query-provider.service';
import { Subscription } from 'rxjs';

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

  savedTemplates: FeasibilityQueryTemplate[];

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
          const feasibilityTemplate = new FeasibilityQueryTemplate();
          feasibilityTemplate.comment = template.comment;
          feasibilityTemplate.content = template.content;
          feasibilityTemplate.createdBy = template.createdBy;
          feasibilityTemplate.id = template.id;
          feasibilityTemplate.invalidTerms = template.invalidTerms;
          feasibilityTemplate.label = template.label;
          feasibilityTemplate.lastModified = template.lastModified;
          if (template.invalidTerms.length > 0) {
            feasibilityTemplate.isValid = false;
          } else {
            feasibilityTemplate.isValid = true;
          }
          this.savedTemplates.push(feasibilityTemplate);
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
