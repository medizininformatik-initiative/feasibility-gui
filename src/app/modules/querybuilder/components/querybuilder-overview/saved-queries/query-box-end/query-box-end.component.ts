/*import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { QueryProviderService } from '../../../../service/query-provider.service';
import { Router } from '@angular/router';
import { FeatureService } from '../../../../../../service/Feature.service';
import { StructuredQuery2UIQueryTranslatorService } from '../../../../../../service/StructuredQuery2UIQueryTranslator.service';
import { QueryService } from 'src/app/service/QueryService.service';

@Component({
  selector: 'num-query-box-end',
  templateUrl: './query-box-end.component.html',
  styleUrls: ['./query-box-end.component.scss'],
})
export class QueryBoxEndComponent implements OnInit {
  @Input()
  queryType: string;

  @Input()
  query: any;

  @Input()
  index: number;

  @Input()
  editMode: Array<boolean>;

  @Output()
  reloadQueries = new EventEmitter<string>();

  queryObject: any;

  constructor(
    private backend: BackendService,
    private queryProviderService: QueryProviderService,
    private apiTranslator: StructuredQuery2UIQueryTranslatorService,
    private router: Router,
    private feature: FeatureService,
    private queryService: QueryService
  ) {}

  ngOnInit() {}

  deleteQueryObject() {
    if (this.queryType === 'template') {
      this.deleteTemplate();
    } else {
      this.deleteQuery();
    }
  }

  deleteQuery(): void {
    this.backend.deleteSavedQuery(this.query.id).subscribe(() => {
      this.emitUpdateQueries('query');
    });
  }

  deleteTemplate() {
    this.backend.deleteSavedTemplate(this.query.id).subscribe(() => {
      this.emitUpdateQueries('template');
    });
  }

  emitUpdateQueries(queryType: string): void {
    this.reloadQueries.emit(queryType);
  }

  loadQueryObject(): void {
    if (this.queryType === 'template') {
      this.loadTemplateIntoFeasibilityPage(this.query);
    } else {
      this.loadQueryIntoFeasibilityPage(this.query);
    }
  }

  loadQueryIntoFeasibilityPage(singleQuery): void {
    this.backend.loadStructuredQuery(singleQuery.id).subscribe((query) => {
      this.apiTranslator.translateSQtoUIQuery(query).subscribe((translatedQuery) => {
        this.query = translatedQuery;
        this.storeQueryAndNavigate(singleQuery.totalNumberOfPatients);
      });
    });
  }

  loadTemplateIntoFeasibilityPage(singleTemplate): void {
    if (this.feature.mockLoadnSave()) {
      this.queryObject = singleTemplate;
      this.storeTemplateAndNavigate();
    } else {
      this.backend.loadTemplate(singleTemplate.id).subscribe((query) => {
        this.apiTranslator.translateSQtoUIQuery(query).subscribe((translatedQuery) => {
          this.query = translatedQuery;
          this.storeTemplateAndNavigate();
        });
      });
    }
  }

  storeTemplateAndNavigate() {
    this.queryService.setFeasibilityQuery(this.query);
    this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } });
  }

  storeQueryAndNavigate(singleQueryloadedResult) {
    this.queryService.setFeasibilityQuery(this.query);
    this.router.navigate(['/querybuilder/editor'], {
      state: { preventReset: true, resultFromSavedQuery: singleQueryloadedResult?.toString() },
    });
  }
}
*/
