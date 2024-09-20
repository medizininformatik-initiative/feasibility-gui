import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterfaceSavedQueryTile } from '../../models/SavedQueryTile/InterfaceSavedQueryTile';

@Component({
  selector: 'num-saved-query-tile',
  templateUrl: './saved-query-tile.component.html',
  styleUrls: ['./saved-query-tile.component.scss'],
})
export class SavedQueryTileComponent {
  @Input()
  savedQuery: InterfaceSavedQueryTile;

  @Output()
  deleteQuery = new EventEmitter<string>();

  @Output()
  navigate = new EventEmitter<string>();

  public onNavigate(id: string) {
    this.navigate.emit(id);
  }

  public onDelete(id: string) {
    this.deleteQuery.emit(id);
  }
}
