import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTranslator } from 'src/app/modules/querybuilder/controller/ApiTranslator';
import { Query } from 'src/app/modules/querybuilder/model/api/query/query';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { FeatureProviderService } from 'src/app/modules/querybuilder/service/feature-provider.service';
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service';
import { FeatureService } from 'src/app/service/feature.service';

@Component({
  selector: 'num-single-template',
  templateUrl: './single-template.component.html',
  styleUrls: ['./single-template.component.scss'],
})
export class SingleTemplateComponent implements OnInit {
  @Input()
  singleTemplate;

  @Input()
  isInvalid = false;

  @Output()
  reloadSavedTemplates = new EventEmitter<boolean>();
  query: Query;

  constructor(
    private backend: BackendService,
    public queryProviderService: QueryProviderService,
    private router: Router,
    public featureProviderService: FeatureProviderService,
    private apiTranslator: ApiTranslator,
    private feature: FeatureService
  ) {}

  ngOnInit() {}

  loadTemplate(): void {
    if (this.feature.mockLoadnSave()) {
      this.query = this.singleTemplate;
      this.queryProviderService.store(this.query);
      this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } });
    } else {
      this.backend.loadTemplate(this.singleTemplate.id).subscribe((query) => {
        this.query = this.apiTranslator.translateSQtoUIQuery(
          QueryProviderService.createDefaultQuery(),
          query
        );
        this.queryProviderService.store(this.query);
        this.router.navigate(['/querybuilder/editor'], { state: { preventReset: true } });
      });
    }
  }

  saveTemplate() {
    const requestBody = {
      label: this.singleTemplate.label,
      comment: 'ddddd',
    };
    this.backend.updateTemplate(this.singleTemplate.id, requestBody).subscribe();
  }

  deleteTemplate() {
    this.backend.deleteSavedTemplates(this.singleTemplate.id).subscribe(() => {
      this.reloadSavedTemplates.emit();
    });
  }
}
