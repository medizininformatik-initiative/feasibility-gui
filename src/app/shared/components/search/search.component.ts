import { debounceTime, filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  /* istanbul ignore next */
  private readonly debounceTime = 200;
  searchForm: UntypedFormGroup;
  constructor() {}

  private subscriptions = new Subscription();

  @Input() label: string;
  @Input() minLength = 3;
  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter();

  currentText = '';

  ngOnInit(): void {
    this.searchForm = new UntypedFormGroup({
      query: new UntypedFormControl(this.searchText || ''),
    });

    this.subscriptions.add(
      this.searchForm
        .get('query')
        .valueChanges.pipe(
          debounceTime(this.debounceTime),
          filter((value) => value.length >= this.minLength)
        )
        .subscribe((value) => {
          this.currentText = value;
          this.searchTextChange.emit(value);
        })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        switch (propName) {
          case 'searchText': {
            if (
              !change.isFirstChange() &&
              this.currentText !== change.currentValue &&
              change.currentValue.length >= this.minLength
            ) {
              this.patchInput(change.currentValue);
            }
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  patchInput(value: string): void {
    if (this.searchForm.value.query !== undefined) {
      this.searchForm.patchValue({
        query: value,
      });
    }
  }

  clearInput(): void {
    this.patchInput('');
  }
}
