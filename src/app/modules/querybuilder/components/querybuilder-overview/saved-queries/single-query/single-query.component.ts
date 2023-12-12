import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { SavedQueriesService } from '../saved-queries.service';
import { editModeData } from '../saved-queries.component';
@Component({
  selector: 'num-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss'],
})
export class SingleQueryComponent implements OnInit {
  @Input()
  singleQuery;

  @Input()
  editMode: editModeData;

  @Input()
  index: number;

  @Output()
  reloadQueries = new EventEmitter<string>();
  updatedLabel = '';

  updatedComment = '';

  disabledInput = false;

  constructor(private backend: BackendService, private savedQueryService: SavedQueriesService) {
    this.savedQueryService.callSaveUpdate.subscribe((index) => {
      this.triggerUpdate(index);
    });
  }
  ngOnInit() {
    this.updatedLabel = this.singleQuery.label;
    this.updatedComment = this.singleQuery.comment;
  }

  deleteNewInputonFocusOut() {
    this.updatedLabel = this.singleQuery.label;
    this.updatedComment = this.singleQuery.comment;
    this.updateLabel();
  }

  updateLabel() {
    if (
      this.singleQuery.label !== this.updatedLabel ||
      this.singleQuery.comment !== this.updatedComment
    ) {
      this.disabledInput = true;
    } else {
      this.disabledInput = false;
    }
  }

  updateQuery() {
    if (this.disabledInput) {
      const updateQueryObject = this.setNewQueryProperties();
      this.backend.updateQuery(this.singleQuery.id, updateQueryObject).subscribe(() => {
        this.disabledInput = false;
        this.emitUpdateQueries(this.singleQuery);
      });
    }
  }

  setNewQueryProperties() {
    this.singleQuery.label = this.updatedLabel;
    this.singleQuery.comment = this.updatedComment;
    const updateQueryObject = {
      label: this.singleQuery.label,
      comment: this.singleQuery.comment,
    };
    return updateQueryObject;
  }

  emitUpdateQueries(queryType: string): void {
    this.reloadQueries.emit(queryType);
  }

  triggerUpdate(index: number) {
    if (index === this.index) {
      this.updateQuery();
    }
  }
}
