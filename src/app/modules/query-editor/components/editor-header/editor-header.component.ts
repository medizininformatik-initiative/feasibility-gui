import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileProviderIteratorService } from 'src/app/service/ProfileProviderIteratorService.service';

@Component({
  selector: 'num-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss'],
})
export class EditorHeaderComponent implements OnChanges {
  @Input() id: string;
  @Input() type: string;

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

  public navigateToNextProfile(): void {
    this.profileProviderIteratorService.navigateToNextProfile(this.id);
  }

  public navigateToPreviousProfile(): void {
    this.profileProviderIteratorService.navigateToPreviousProfile(this.id);
  }
}
