import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { QueryService } from 'src/app/service/QueryService.service';

@Directive({
  selector: '[numAppDropGroup]',
})
export class DropGroupDirective {
  @Input() groupType: string;
  private groupId = 1;

  constructor(
    private queryProviderService: QueryService,
    private criterionProviderService: CriterionService,
    private elementRef: ElementRef
  ) {}

  @HostListener('cdkDropListDropped', ['$event'])
  onDrop(event: CdkDragDrop<any[]>) {
    const groupType = this.groupType || this.elementRef.nativeElement.getAttribute('groupType');
    switch (groupType) {
      case 'Exclusion':
        this.handleExclusionDrop(event);
        break;
      case 'Inclusion':
        this.handleInclusionDrop(event);
        break;
      default:
        console.warn('Unknown groupType:', groupType);
        break;
    }
  }

  private handleExclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    this.criterionProviderService.setCriterionForExclusion(droppedCriterion);
    this.criterionProviderService.deleteCriterionByUID(droppedCriterion.uniqueID);
  }

  private handleInclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    this.criterionProviderService.setCriterionForInclusion(droppedCriterion);
    this.criterionProviderService.deleteCriterionByUID(droppedCriterion.uniqueID);
  }
}
