import { debounceTime, filter } from 'rxjs/operators';
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
import { SearchService } from 'src/app/service/Search/Search.service';

@Component({
  selector: 'num-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnChanges, OnDestroy {
  private readonly debounceTime = 300;
  searchForm: UntypedFormGroup;
  constructor(private searchService: SearchService) {}

  private subscriptions = new Subscription();

  @Input() label: string;
  @Input() minLength = 3;
  @Input() searchText = '';
  @Output() searchTextChange = new EventEmitter();

  showWarning = false;

  currentText = '';

  ngOnInit(): void {
    this.searchForm = new UntypedFormGroup({
      query: new UntypedFormControl(this.searchText || ''),
    });

    this.subscriptions.add(
      this.searchForm
        .get('query')
        .valueChanges.pipe(debounceTime(this.debounceTime))
        .subscribe((value) => {
          this.currentText = value;
          this.showWarning = value.length > 0 && value.length < this.minLength;
          if (value.length >= this.minLength || value.length === 0) {
            this.searchService.setActiveSearchTerm(value);
            this.searchTextChange.emit(value);
          }
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
