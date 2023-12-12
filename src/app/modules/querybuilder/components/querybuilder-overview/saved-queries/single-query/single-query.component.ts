import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
@Component({
  selector: 'num-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss'],
})
export class SingleQueryComponent implements OnInit {
  @Input()
  singleQuery;

  @Input()
  index: number;

  @Output()
  reloadQueries = new EventEmitter<string>();

  @Output()
  editMode = new EventEmitter<boolean>();

  updatedLabel = '';

  updatedComment = '';

  disabledInput = false;

  editModeQuery = { label: false, comment: false };

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.updatedLabel = this.singleQuery.label;
    this.updatedComment = this.singleQuery.comment;
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
  deleteNewInputonFocusOut() {
    this.updatedLabel = this.singleQuery.label;
    this.updatedComment = this.singleQuery.comment;
    this.editModeQuery.label = false;
    this.editModeQuery.comment = false;
    this.editMode.emit(false);
    this.updateLabel();
  }

  editLabel(): void {
    this.editModeQuery.label = true;
    this.editMode.emit(true);
    setTimeout(() => {
      document.getElementById('query_label_' + this.index).focus();
    }, 50);
  }
  editComment(): void {
    this.editModeQuery.comment = true;
    this.editMode.emit(true);
    setTimeout(() => {
      document.getElementById('query_comment_' + this.index).focus();
    }, 50);
  }
  saveLabel(): void {
    this.editModeQuery.label = false;
    this.editMode.emit(false);
    this.updateQuery();
  }
  saveComment(): void {
    this.editModeQuery.comment = false;
    this.editMode.emit(false);
    this.updateQuery();
  }
}
