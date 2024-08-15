import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MatMenuTrigger } from '@angular/material/menu';
import { InterfaceFilterChip } from '../../models/FilterChips/InterfaceFilterChip';
import { Observable } from 'rxjs';
import { CriterionFilterChipService } from '../../service/FilterChips/Criterion/CriterionFilterChips.service';

@Component({
  selector: 'num-criteria-box',
  templateUrl: './criteria-box.component.html',
  styleUrls: ['./criteria-box.component.scss'],
  providers: [CriterionFilterChipService],
})
export class CriteriaBoxComponent implements AfterViewInit, OnInit {
  @Input()
  criterion: Criterion;

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @ViewChild('menu', { read: MatMenuTrigger }) criteriaMenuTrigger: MatMenuTrigger;

  constructor(private filterChipsService: CriterionFilterChipService) {}

  ngOnInit() {
    if (this.criterion) {
      this.getFilterChips();
    }
  }

  ngAfterViewInit() {
    if (this.criteriaMenuTrigger) {
      this.menuTrigger = this.criteriaMenuTrigger;
    }
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }

  getFilterChips() {
    this.$filterChips = this.filterChipsService.generateFilterChipsFromCriterion(this.criterion);
  }
}
