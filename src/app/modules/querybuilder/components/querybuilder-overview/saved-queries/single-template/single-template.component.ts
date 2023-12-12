import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { SavedQueriesService } from '../saved-queries.service';
import { editModeData } from '../saved-queries.component';

@Component({
  selector: 'num-single-template',
  templateUrl: './single-template.component.html',
  styleUrls: ['./single-template.component.scss'],
})
export class SingleTemplateComponent implements OnInit {
  @Input()
  singleTemplate;

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
    this.updateLabel();
  }
  triggerUpdate(index: number) {
    if (index === this.index) {
      this.updateTemplate();
    }
  }
}
