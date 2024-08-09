import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { MatMenuTrigger } from '@angular/material/menu';

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
    if (this.criteriaMenuTrigger) {
      this.menuTrigger = this.criteriaMenuTrigger;
    }
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }
}
