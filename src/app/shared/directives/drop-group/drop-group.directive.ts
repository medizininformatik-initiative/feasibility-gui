import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FeasibilityQueryProviderService } from '../../../service/Provider/FeasibilityQueryProvider.service';
import { FeasibilityQuery } from '../../../model/FeasibilityQuery/FeasibilityQuery';
import { StageProviderService } from '../../../service/Provider/StageProvider.service';

@Directive({
  selector: '[numAppDropGroup]',
})
export class DropGroupDirective implements OnInit {
  @Input() groupType: string;

  criteria: string[][] = [];
  feasibilityQuery: FeasibilityQuery;
  constructor(
    private queryProviderService: FeasibilityQueryProviderService,
    private stageProviderService: StageProviderService,
    private elementRef: ElementRef
  ) {}

  @HostListener('cdkDropListDropped', ['$event'])
  onDrop(event: CdkDragDrop<any[]>) {
    const groupType = this.groupType || this.elementRef.nativeElement.getAttribute('groupType');
    const droppedCriterion: string = event.item.data;
    if (event.container.id !== event.previousContainer.id) {
      switch (event.container.id) {
        case 'Exclusion':
          this.addToExclusion(droppedCriterion);
          break;
        case 'Inclusion':
          this.addToInclusion(droppedCriterion);
          break;
        case 'Stage':
          this.stageProviderService.addCriterionToStage(droppedCriterion);
          break;
        default:
          break;
      }
      switch (event.previousContainer.id) {
        case 'Exclusion':
          this.deleteFromExclusion(droppedCriterion);
          break;
        case 'Inclusion':
          this.deleteFromInclusion(droppedCriterion);
          break;
        case 'Stage':
          this.stageProviderService.deleteCriterionByUID(droppedCriterion);
          break;
        default:
          break;
      }
    }
  }
  /*@HostListener('cdkDropListExited', ['$event'])
  onExit(event: CdkDragDrop<any[]>) {
    console.log('exit')
    console.log(event)
  }*/

  ngOnInit() {
    this.queryProviderService.getFeasibilityQueryByID().subscribe((feasibilityQuery) => {
      this.feasibilityQuery = feasibilityQuery.get('1');
    });
  }
  private addToInclusion(droppedCriterion: string): void {
    this.criteria = this.feasibilityQuery.getInclusionCriteria();
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setInclusionCriteria(this.criteria);
  }
  private addToExclusion(droppedCriterion: string): void {
    this.criteria = this.feasibilityQuery.getExclusionCriteria();
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setExclusionCriteria(this.criteria);
  }

  private deleteFromInclusion(droppedCriterion: string): void {
    const criteria = this.deleteCriterion(
      this.feasibilityQuery.getInclusionCriteria(),
      droppedCriterion
    );
    this.queryProviderService.setInclusionCriteria(criteria);
  }
  private deleteFromExclusion(droppedCriterion: string): void {
    const criteria = this.deleteCriterion(
      this.feasibilityQuery.getExclusionCriteria(),
      droppedCriterion
    );
    this.queryProviderService.setExclusionCriteria(criteria);
  }

  private deleteCriterion(inexclusion: string[][], criterionID: string): string[][] {
    inexclusion.forEach((idArray) => {
      const index = idArray.indexOf(criterionID);
      if (index > -1) {
        idArray.splice(index, 1);
      }
    });
    inexclusion = inexclusion.filter((item) => item.length > 0);
    return inexclusion;
  }
}
