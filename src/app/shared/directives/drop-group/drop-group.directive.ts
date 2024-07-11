import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numAppDropGroup]',
})
export class DropGroupDirective {
  @Input() groupType: string;

  constructor(
    private criterionProviderService: CriterionProviderService,
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
        break;
    }
  }

  private handleExclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    //this.criterionProviderService.setCriterionForExclusion(droppedCriterion);
    this.criterionProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
  }

  private handleInclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    //this.criterionProviderService.setCriterionForInclusion(droppedCriterion);
    this.criterionProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
    console.log(event);
  }
}
