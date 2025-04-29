import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, pipe, Subscription, take, tap } from 'rxjs';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';
import { ProfileReferenceModalService } from 'src/app/service/DataSelection/ProfileReferenceModal.service';
import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { StagedReferenceFieldProviderService } from 'src/app/service/Provider/StagedReferenceFieldProvider.service';

@Component({
  selector: 'num-reference-field-tab',
  templateUrl: './reference-field-tab.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reference-field-tab.component.scss'],
  providers: [PossibleReferencesService],
})
export class ReferenceFieldTabComponent implements OnInit, OnDestroy {
  @Input()
  referenceField: ReferenceField;

  @Input()
  profileId: string;

  @Output()
  selectedProfileAsReference: EventEmitter<PossibleProfileReferenceData> =
    new EventEmitter<PossibleProfileReferenceData>();

  possibleReferences$: Observable<PossibleProfileReferenceData[]>;

  referencedProfileUrls: string[] = [];

  elementId: string;

  openModalWindowSubscription: Subscription;

  constructor(
    private possibleReferencesService: PossibleReferencesService,
    private profileReferenceModalService: ProfileReferenceModalService,
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService
  ) {}

  ngOnInit(): void {
    this.referencedProfileUrls = this.referenceField.getReferencedProfileUrls();
    this.elementId = this.referenceField.getElementId();
    this.loadPossibleReferences();
  }

  ngOnDestroy(): void {
    this.openModalWindowSubscription?.unsubscribe();
  }

  private loadPossibleReferences(): void {
    this.possibleReferences$ = this.possibleReferencesService.filterPossibleReferences(
      this.elementId,
      this.profileId,
      this.referencedProfileUrls
    );
  }

  public openReferenceModal(): void {
    this.openModalWindowSubscription?.unsubscribe();
    this.openModalWindowSubscription = this.profileReferenceModalService
      .openProfileReferenceModal(this.referencedProfileUrls, this.profileId)
      .pipe(take(1))
      .subscribe((urls: string[]) => {
        urls.map((url) =>
          this.stagedReferenceFieldProviderService.addUrlToReferenceField(
            url,
            this.profileId,
            this.referenceField.getElementId()
          )
        );
      });
  }

  public emitSelectedProfile(profile: PossibleProfileReferenceData): void {
    this.stagedReferenceFieldProviderService.addUrlToReferenceField(
      profile.url,
      this.profileId,
      this.elementId
    );
    this.selectedProfileAsReference.emit(profile);
  }
}
