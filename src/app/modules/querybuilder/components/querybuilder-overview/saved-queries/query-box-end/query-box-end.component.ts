import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { SavedQueriesService } from '../saved-queries.service';
import { editModeData } from '../saved-queries.component';
@Component({
  selector: 'num-query-box-end',
  templateUrl: './query-box-end.component.html',
  styleUrls: ['./query-box-end.component.scss'],
})
export class QueryBoxEndComponent implements OnInit {
  @Input()
  queryType: string;

  @Input()
  query;

  @Input()
  index: number;

  @Output()
  reloadQueries = new EventEmitter<string>();

  @Output()
  editModus = new EventEmitter<editModeData>();

  editMode = false;

  constructor(private backend: BackendService, private savedQueryService: SavedQueriesService) {}

  ngOnInit() {}

  deleteQueryObject() {
    if (this.queryType === 'template') {
      this.deleteTemplate();
    } else {
      this.deleteQuery();
    }
  }
  editQueryObject() {
    this.editMode = true;
    this.editModus.emit({ type: this.queryType, editMode: this.editMode });
  }
  deleteQuery(): void {
    this.backend.deleteSavedQuery(this.query.id).subscribe(() => {
      this.emitUpdateQueries('query');
    });
  }

  deleteTemplate() {
    this.backend.deleteSavedTemplate(this.query.id).subscribe(() => {
      this.emitUpdateQueries('template');
    });
  }

  emitUpdateQueries(queryType: string): void {
    this.reloadQueries.emit(queryType);
  }

  saveUpdate(): void {
    this.editMode = false;
    this.editModus.emit({ type: this.queryType, editMode: this.editMode });
    this.savedQueryService.callSaveUpdate.next(this.index);
  }
}
