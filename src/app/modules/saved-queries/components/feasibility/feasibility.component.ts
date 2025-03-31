import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';

@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit {
  @Input()
  savedQueries: InterfaceSavedQueryTile[];

  @Input()
  totalNumberOfPatients: number;

  @Output()
  deleteQuery = new EventEmitter<string>();

  @Output()
  loadQuery = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public onDelete(id: any) {
    this.deleteQuery.emit(id);
  }

  public onLoad(id: string) {
    this.loadQuery.emit(id);
  }
}
