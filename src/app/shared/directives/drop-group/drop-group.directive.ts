import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FeasibilityQueryProviderService } from '../../../service/Provider/FeasibilityQueryProvider.service';
import { Subscription } from 'rxjs';
import { ObjectHelper } from '../../../modules/querybuilder/controller/ObjectHelper';
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
    console.log('event');
    console.log(event.container.id);
    console.log(event.previousContainer.id);
    const groupType = this.groupType || this.elementRef.nativeElement.getAttribute('groupType');
    const droppedCriterion: string = event.item.data;
    switch (event.container.id) {
      case 'Exclusion':
        this.addToExclusion(droppedCriterion);
        break;
      case 'Inclusion':
        this.addToInclusion(droppedCriterion);
        break;
      case 'Stage':
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
    console.log('dropped in');
    console.log(droppedCriterion);
    this.criteria = this.feasibilityQuery.getInclusionCriteria();
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setInclusionCriteria(this.criteria);
    console.log(this.feasibilityQuery.getInclusionCriteria());
  }
  private addToExclusion(droppedCriterion: string): void {
    console.log('dropped ex');
    console.log(droppedCriterion);
    this.criteria = this.feasibilityQuery.getExclusionCriteria();
    console.log(this.criteria);
    this.criteria.push([droppedCriterion]);
    this.queryProviderService.setExclusionCriteria(this.criteria);
    console.log(this.feasibilityQuery.getExclusionCriteria());
  }

  private deleteFromInclusion(droppedCriterion: string): void {
    const criteria: string[][] = this.feasibilityQuery.getInclusionCriteria();
    criteria.forEach((idArray) => {
      const index = idArray.indexOf(droppedCriterion);
      if (index > -1) {
        idArray.splice(index, 1);
      }
    });
    this.queryProviderService.setInclusionCriteria(criteria);
  }
  private deleteFromExclusion(droppedCriterion: string): void {
    const criteria: string[][] = this.feasibilityQuery.getExclusionCriteria();
    criteria.forEach((idArray) => {
      const index = idArray.indexOf(droppedCriterion);
      if (index > -1) {
        idArray.splice(index, 1);
      }
    });
    this.queryProviderService.setExclusionCriteria(criteria);
  }
}
