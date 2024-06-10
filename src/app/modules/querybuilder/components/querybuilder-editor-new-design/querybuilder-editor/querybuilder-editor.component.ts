import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements AfterViewInit {
  $criterionUIDMap: Observable<Map<string, Criterion>>;
  criteriaArray$: Observable<Criterion[]>;

  @ViewChild('stage') stage: ElementRef;

  constructor(
    private criterionProviderService: CriterionService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getCriterionUIDMap();
  }

  scroll(el: ElementRef | null) {
    if (el && el.nativeElement) {
      el.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCriterionUIDMap() {
    this.$criterionUIDMap = this.criterionProviderService.getCriterionUIDMap();
    this.criteriaArray$ = this.$criterionUIDMap.pipe(
      map((criterionMap: Map<string, Criterion>) => Array.from(criterionMap.values()))
    );

    // Manually trigger change detection after the data is ready
    this.$criterionUIDMap.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }
}
