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

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  saveTemplate() {
    const requestBody = {
      label: this.singleTemplate.label,
      comment: 'ddddd',
    };
    this.backend.updateTemplate(this.singleTemplate.id, requestBody).subscribe();
  }
}
