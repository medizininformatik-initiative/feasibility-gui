import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable, map } from 'rxjs';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionService } from 'src/app/service/CriterionService.service';
import { CriteriaMenuComponent } from './criteria-menu/criteria-menu.component';

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
