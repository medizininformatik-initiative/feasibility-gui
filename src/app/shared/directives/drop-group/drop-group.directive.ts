import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FeasibilityQueryProviderService } from '../../../service/Provider/FeasibilityQueryProvider.service';
import { Subscription } from 'rxjs';
import { ObjectHelper } from '../../../modules/querybuilder/controller/ObjectHelper';
import { FeasibilityQuery } from '../../../model/FeasibilityQuery/FeasibilityQuery';
import { StageProviderService } from '../../../service/Provider/StageProvider.service';

@Directive({
  selector: '[numAppDropGroup]',
})
export class DropGroupDirective {
  @Input() groupType: string;

  criteria: Criterion[][] = [];
  feasibilityQuery: FeasibilityQuery = new FeasibilityQuery();
  querySubscription: Subscription;
  constructor(
    private queryProviderService: FeasibilityQueryProviderService,
    private stageProviderService: StageProviderService,
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

  private handleInclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;

    console.log('dropped in');
    this.criteria = this.feasibilityQuery.getInclusionCriteria();
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setInclusionCriteria(this.criteria);
    console.log(this.feasibilityQuery.getInclusionCriteria());

    //this.criterionProviderService.setCriterionByUID(droppedCriterion);
    this.stageProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
    /* this.criterionProviderService.getCriterionUIDMap().subscribe((map) => {
        console.log('map')
        console.log(map)
      }).unsubscribe()*/
    console.log(event);
  }
  private handleExclusionDrop(event: CdkDragDrop<any[]>): void {
    const droppedCriterion: Criterion = event.item.data;
    console.log('dropped ex');
    this.criteria = this.feasibilityQuery.getExclusionCriteria();
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setExclusionCriteria(this.criteria);
    console.log(this.feasibilityQuery.getExclusionCriteria());
    //this.criterionProviderService.setCriterionByUID(droppedCriterion);
    //this.criterionProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
    this.stageProviderService.deleteCriterionByUID(droppedCriterion.getUniqueID());
  }
}
