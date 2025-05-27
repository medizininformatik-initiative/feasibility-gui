import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProfileProviderIteratorService } from 'src/app/service/ProfileProviderIteratorService.service';

@Component({
  selector: 'num-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
})
export class EditorHeaderComponent implements OnChanges, OnDestroy {
  @Input() id: string;
  @Input() type: string;

  nextProfile: Subscription;
  previousProfile: Subscription;

  nextElementExists$: Observable<boolean>;
  previousElementExists$: Observable<boolean>;

  constructor(private profileProviderIteratorService: ProfileProviderIteratorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id && this.id) {
      this.nextElementExists$ = this.profileProviderIteratorService.getNextElementExists(this.id);
      this.previousElementExists$ = this.profileProviderIteratorService.getPreviousElementExists(
        this.id
      );
    }
  }

  ngOnDestroy(): void {
    this.nextProfile?.unsubscribe();
    this.previousProfile?.unsubscribe();
  }

  public navigateToNextProfile(): void {
    this.nextProfile?.unsubscribe();
    this.nextProfile = this.profileProviderIteratorService
      .navigateToNextProfile(this.id)
      .subscribe();
  }

  public navigateToPreviousProfile(): void {
    this.previousProfile?.unsubscribe();
    this.previousProfile = this.profileProviderIteratorService
      .navigateToPreviousProfile(this.id)
      .subscribe();
  }
}
