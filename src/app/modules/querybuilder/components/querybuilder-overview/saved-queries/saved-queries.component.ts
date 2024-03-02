import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../../service/backend.service';
import { Query } from '../../../../../model/FeasibilityQuery/Query';
import { QueryProviderService } from '../../../service/query-provider.service';
import { StructuredQueryTemplate2UITemplateTranslatorService } from 'src/app/service/StructuredQueryTemplate2UITemplateTranslator.service';
import { UISavedQuery } from 'src/app/model/SavedInquiry/UI/UISavedQuery';
import { UITemplate } from 'src/app/model/SavedInquiry/UI/UITemplate';

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit, AfterViewChecked {
  importQuery: Query;
  actionDisabled: boolean;
  editModusQuery: Array<boolean> = [];
  editModusTemplate: Array<boolean> = [];

  constructor(
    public queryProviderService: QueryProviderService,
    private templateService: StructuredQueryTemplate2UITemplateTranslatorService,
    private backend: BackendService,
    private changeDetector: ChangeDetectorRef
  ) {}

  query: Query;

  savedQueries: UISavedQuery[];

  savedTemplates: UITemplate[];

  fileName: string;

  ngOnInit(): void {
    this.query = this.queryProviderService.query();
    this.loadSavedQueries();
    this.loadSavedTemplates();
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
    this.templateService.getStructuredQueryTemplates().subscribe((feasibilityTemplates) => {
      this.savedTemplates = feasibilityTemplates;
    });
  }

  /*loadSavedQueries(): void {
    this.savedQueriesSubscription = this.backend.loadSavedQueries().subscribe((queries) => {
      this.savedQueries = [];
      const temp = queries.sort((a, b) => a.id - b.id);
      temp.forEach((query) => {
        query.isValid = true;
        this.savedQueries.push(query);
      });
    });
  }*/

  loadSavedQueries(): void {
    this.templateService.getSavedStructuredQuerySavedQueries().subscribe((uiSavedQueries) => {
      this.savedQueries = uiSavedQueries;
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
