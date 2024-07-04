import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numAppDropGroup]',
})
export class DropGroupDirective {
  @Input() groupType: string;

  constructor(private criterionProviderService: CriterionService, private elementRef: ElementRef) {}

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
        break;
    }
  }

  private handleExclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    this.criterionProviderService.deleteCriterionFromMapByUID(droppedCriterion.getUniqueID());
  }

  private handleInclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    this.criterionProviderService.deleteCriterionFromMapByUID(droppedCriterion.getUniqueID());
  }
}
