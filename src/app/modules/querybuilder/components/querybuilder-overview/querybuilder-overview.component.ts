/*import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FeatureProviderService } from '../../service/feature-provider.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { QueryProviderService } from '../../service/query-provider.service';
import { Router } from '@angular/router';
import { StructuredQuery } from '../../../../model/StructuredQuery/StructuredQuery';
import { StructuredQuery2UIQueryTranslatorService } from '../../../../service/StructuredQuery2UIQueryTranslator.service';
import { AnnotatedStructuredQuery } from '../../../../model/Result/AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { ValidationService } from '../../../../service/Validation.service';
import { QueryService } from '../../../../service/QueryService.service';

@Component({
  selector: 'num-querybuilder-overview',
  templateUrl: './querybuilder-overview.component.html',
  styleUrls: ['./querybuilder-overview.component.scss'],
})
export class QuerybuilderOverviewComponent implements OnInit, AfterViewChecked {
  importQuery: StructuredQuery;
  actionDisabled: boolean;

  constructor(
    public queryProviderService: QueryProviderService,
    private queryService: QueryService,
    private router: Router,
    public featureProviderService: FeatureProviderService,
    private changeDetector: ChangeDetectorRef,
    private apiTranslator: StructuredQuery2UIQueryTranslatorService,
    private validationService: ValidationService
  ) {}

  query: FeasibilityQuery;

  fileName: string;

  ngOnInit(): void {
    this.query = this.queryProviderService.query();
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

  doImportAndValidate(): void {
    this.validationService
      .validateStructuredQuery(this.importQuery)
      .subscribe((annotatedStructuredQuery) => {
        this.translateAnnotatedStructuredQuery(annotatedStructuredQuery);
      });
  }

  translateAnnotatedStructuredQuery(annotatedStructuredQuery: AnnotatedStructuredQuery) {
    this.apiTranslator
      .translateImportedSQtoUIQuery(annotatedStructuredQuery)
      .subscribe((translatedQuery) => {
        this.query = translatedQuery;
        this.storeQueryAndNavigate();
      });
  }

  storeQueryAndNavigate() {
    this.queryService.setFeasibilityQuery(this.query);
    this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } });
  }
}
*/
