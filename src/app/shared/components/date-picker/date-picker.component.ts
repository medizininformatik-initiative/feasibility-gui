import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'num-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output()
  dateChanged: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  selectedDate = '';

  public emitSelectedDate(): void {
    this.dateChanged.emit(this.selectedDate);
  }
}
