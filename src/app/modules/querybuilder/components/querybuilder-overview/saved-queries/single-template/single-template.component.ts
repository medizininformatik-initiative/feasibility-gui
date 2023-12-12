import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';

@Component({
  selector: 'num-single-template',
  templateUrl: './single-template.component.html',
  styleUrls: ['./single-template.component.scss'],
})
export class SingleTemplateComponent implements OnInit {
  @Input()
  singleTemplate;

  @Input()
  index: number;

  @Output()
  reloadQueries = new EventEmitter<string>();

  @Output()
  editMode = new EventEmitter<boolean>();

  updatedLabel = '';

  updatedComment = '';

  disabledInput = false;

  editModeTemplate = { label: false, comment: false };

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.updatedLabel = this.singleTemplate.label;
    this.updatedComment = this.singleTemplate.comment;
  }

  updateLabel() {
    if (
      this.singleTemplate.label !== this.updatedLabel ||
      this.singleTemplate.comment !== this.updatedComment
    ) {
      this.disabledInput = true;
    } else {
      this.disabledInput = false;
    }
  }

  updateTemplate() {
    if (this.disabledInput) {
      const updateQueryObject = this.setNewTemplateProperties();
      this.backend.updateTemplate(this.singleTemplate.id, updateQueryObject).subscribe(() => {
        this.disabledInput = false;
        this.emitUpdateQueries(this.singleTemplate);
      });
    }
  }

  setNewTemplateProperties() {
    this.singleTemplate.label = this.updatedLabel;
    this.singleTemplate.comment = this.updatedComment;
    const updateQueryObject = {
      label: this.singleTemplate.label,
      comment: this.singleTemplate.comment,
    };
    return updateQueryObject;
  }

  emitUpdateQueries(queryType: string): void {
    this.reloadQueries.emit(queryType);
  }

  deleteNewInputonFocusOut() {
    this.updatedLabel = this.singleTemplate.label;
    this.updatedComment = this.singleTemplate.comment;
    this.editModeTemplate.label = false;
    this.editModeTemplate.comment = false;
    this.editMode.emit(false);
    this.updateLabel();
  }

  editLabel(): void {
    this.editModeTemplate.label = true;
    this.editMode.emit(true);
    setTimeout(() => {
      document.getElementById('template_label_' + this.index).focus();
    }, 50);
  }
  editComment(): void {
    this.editModeTemplate.comment = true;
    this.editMode.emit(true);
    setTimeout(() => {
      document.getElementById('template_comment_' + this.index).focus();
    }, 50);
  }
  saveLabel(): void {
    this.editModeTemplate.label = false;
    this.editMode.emit(false);
    this.updateTemplate();
  }
  saveComment(): void {
    this.editModeTemplate.comment = false;
    this.editMode.emit(false);
    this.updateTemplate();
  }
}
