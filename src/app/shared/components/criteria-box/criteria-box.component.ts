import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';

@Component({
  selector: 'num-criteria-box',
  templateUrl: './criteria-box.component.html',
  styleUrls: ['./criteria-box.component.scss'],
})
export class CriteriaBoxComponent implements AfterViewInit, OnInit {
  @Input()
  criterion: Criterion;

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @ViewChild('menu', { read: MatMenuTrigger }) criteriaMenuTrigger: MatMenuTrigger;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Ensure the menuTrigger references the correct MatMenu
    if (this.criteriaMenuTrigger) {
      this.menuTrigger = this.criteriaMenuTrigger;
    }
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }
}
