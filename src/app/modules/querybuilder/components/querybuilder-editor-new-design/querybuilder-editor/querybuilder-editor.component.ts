import { Component, ElementRef, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../criteria/criteria.component';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent {
  @ViewChild('stage') stage: CriteriaComponent;

  constructor() {}

  scroll() {
    if (this.stage) {
      const element = this.stage.elementRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
