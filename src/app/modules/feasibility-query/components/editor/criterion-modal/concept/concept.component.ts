import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Concept } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { ConceptFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'num-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
})
export class ConceptComponent implements OnInit {
  @Input()
  conceptFilter: ConceptFilter;

  @Output()
  changedConceptFilter = new EventEmitter<ConceptFilter>();

  @Input()
  attributeCode: TerminologyCode;

  expanded = false;

  constructor() {}

  ngOnInit() {
    if (!this.attributeCode) {
      this.expanded = true;
    }
  }

  public emitConceptFilter(selectedConcepts: Concept[]) {
    const newConceptFilter = new ConceptFilter(
      uuidv4(),
      this.conceptFilter.getAllowedConceptUrls(),
      selectedConcepts
    );
    this.changedConceptFilter.emit(newConceptFilter);
  }
}
