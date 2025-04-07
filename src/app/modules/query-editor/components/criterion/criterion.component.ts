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
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CreateCriterionService } from 'src/app/service/Criterion/Builder/Create/CreateCriterionService';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';

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

  criterion$: Observable<Criterion>;

  dseElement$: Observable<DataSelectionProfile>;
  currentTemplates: TemplateRef<any>[] = [];

  constructor(
    private dse: CreateDataSelectionProfileService,
    private createCriterionService: CreateCriterionService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getCriterionFromProviderById(this.id);
  }

  private getCriterionFromProviderById(id: string) {
    this.id = '77720c97-fbd3-32e2-baa4-5787c2ab777d';
    const dseId =
      'https://www.medizininformatik-initiative.de/fhir/core/modul-person/StructureDefinition/PatientPseudonymisiert';
    this.dseElement$ = this.dse.fetchDataSelectionProfileData([dseId]).pipe(map((data) => data[0]));
    this.criterion$ = this.createCriterionService.createCriteriaFromHashes([this.id]).pipe(
      map((criteria) => criteria[0])
    );

    this.criterion$.subscribe((criterion) => {
      this.currentTemplates = [];

      criterion.getAttributeFilters().forEach((attributeFilter) => {
        if (attributeFilter.getConcept() !== undefined) {
          this.concept = attributeFilter.getConcept();
        }
      });

      this.currentTemplates.push(this.timeRestrictionTemplate);
    });
  }
}
