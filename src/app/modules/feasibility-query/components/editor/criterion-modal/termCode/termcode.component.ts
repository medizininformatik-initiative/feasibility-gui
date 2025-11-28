import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

@Component({
  selector: 'num-edit-termcode',
  templateUrl: './termcode.component.html',
  styleUrls: ['./termcode.component.scss'],
})
export class TermcodeComponent implements OnInit {
  @Input()
  termCodes: TerminologyCode[];

  @Output()
  changedTermCodes = new EventEmitter<TerminologyCode[]>();

  ngOnInit(): void {
    console.log(this.termCodes);
  }

  public removeTermCode(termCodeToRemove: TerminologyCode): void {
    this.termCodes = this.termCodes.filter(
      (termCode: TerminologyCode) =>
        termCode.getCode() !== termCodeToRemove.getCode() ||
        termCode.getSystem() !== termCodeToRemove.getSystem()
    );
    console.log(this.termCodes);
    this.changedTermCodes.emit(this.termCodes);
  }

  public onTermCodesChange(updatedTermCodes: TerminologyCode[]): void {
    this.changedTermCodes.emit(updatedTermCodes);
  }
}
