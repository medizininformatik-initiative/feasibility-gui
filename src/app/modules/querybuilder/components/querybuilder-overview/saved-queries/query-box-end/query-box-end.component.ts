import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
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

  @Output()
  reloadQueries = new EventEmitter<string>();

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  deleteQueryObject() {
    if (this.queryType === 'template') {
      this.deleteTemplate();
    } else {
      this.deleteQuery();
    }
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
}
