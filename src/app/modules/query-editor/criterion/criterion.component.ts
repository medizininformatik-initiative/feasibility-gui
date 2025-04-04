import {
  Component,
  Input,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterionService';

@Component({
  selector: 'num-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss'],
})
export class CriterionComponent implements OnInit, AfterViewInit {
  @Input() id: string;

  concept: ConceptFilter;

  @ViewChild('timeRestriction', { static: false, read: TemplateRef })
  timeRestrictionTemplate: TemplateRef<any>;

  @ViewChild('concept1', { static: false, read: TemplateRef })
  conceptTemplate1: TemplateRef<any>;

  @ViewChild('concept', { static: false, read: TemplateRef })
  conceptTemplate: TemplateRef<any>;

  @ViewChild('concept2', { static: false, read: TemplateRef })
  conceptTemplate2: TemplateRef<any>;

  criterion$: Observable<Criterion>;
  currentTemplates: TemplateRef<any>[] = [];

  constructor(private createCriterionService: CreateCriterionService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getCriterionFromProviderById(this.id);
  }

  private getCriterionFromProviderById(id: string) {
    this.id = '77720c97-fbd3-32e2-baa4-5787c2ab777d';
    this.criterion$ = this.createCriterionService.createCriteriaFromHashes([this.id]).pipe(
      map((criteria) => {
        console.log('Criteria retrieved:', criteria);
        return criteria[0];
      })
    );

    this.criterion$.subscribe((criterion) => {
      this.currentTemplates = [];

      criterion.getAttributeFilters().forEach((attributeFilter) => {
        if (attributeFilter.getConcept() !== undefined) {
          this.concept = attributeFilter.getConcept();
          this.currentTemplates.push(this.conceptTemplate);
          this.currentTemplates.push(this.conceptTemplate1);
          this.currentTemplates.push(this.conceptTemplate2);
          console.log(this.conceptTemplate);
          console.log(this.concept);
        }
      });

      this.currentTemplates.push(this.timeRestrictionTemplate);
    });
  }
}
