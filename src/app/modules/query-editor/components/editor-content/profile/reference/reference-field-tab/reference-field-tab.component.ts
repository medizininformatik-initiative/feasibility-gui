import { CreateSelectedReferenceService } from 'src/app/service/CreateSelectedReference.service';
import { filter, map, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';
import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { ProfileReferenceModalService } from 'src/app/service/DataSelection/ProfileReferenceModal.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'num-reference-field-tab',
  templateUrl: './reference-field-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reference-field-tab.component.scss'],
})
export class ReferenceFieldTabComponent implements OnInit, OnDestroy {
  @Input()
  referenceField: ReferenceField;

  @Input()
  profileId: string;

  @Input()
  selectedField: SelectedReferenceField;

  @Output()
  selectedProfileAsReference: EventEmitter<SelectedReferenceField> =
    new EventEmitter<SelectedReferenceField>();

  possibleReferences$: Observable<PossibleProfileReferenceData[]>;

  referencedProfileUrls: string[] = [];

  elementId: string;

  openModalWindowSubscription: Subscription;

  constructor(
    private createSelectedReferenceService: CreateSelectedReferenceService,
    private possibleReferencesService: PossibleReferencesService,
    private profileReferenceModalService: ProfileReferenceModalService
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
    this.possibleReferences$ = this.possibleReferencesService.getPossibleReferencesMap().pipe(
      filter((innerMap) => innerMap.has(this.profileId)),
      map((innerMap) => innerMap.get(this.profileId).get(this.elementId))
    );
  }

  public openReferenceModal(): void {
    this.openModalWindowSubscription?.unsubscribe();
    this.openModalWindowSubscription = this.profileReferenceModalService
      .openProfileReferenceModal(this.referencedProfileUrls, this.profileId)
      .pipe(
        take(1),
        switchMap((urls: string[]) =>
          this.possibleReferencesService.fetchProfilesAndMapToPossibleReferences(
            urls,
            this.elementId,
            this.profileId
          )
        ),
        map((references) => this.createSelectedReferenceService.mapPossibleReferencesToSelectedReferences(
            references,
            this.referenceField
          ))
      )
      .subscribe((selectedReferenceFields: SelectedReferenceField) => {
        this.selectedProfileAsReference.emit(selectedReferenceFields);
      });
  }

  public updateSelectedPossibleReferences(test: PossibleProfileReferenceData): void {
    this.possibleReferencesService
      .getPossibleReferencesMap()
      .pipe(
        filter((innerMap) => innerMap.has(this.profileId)),
        map((innerMap) => innerMap.get(this.profileId).get(this.elementId)),
        take(1), // Ensure the observable completes after one emission
        tap((possibleReferences) => {
          if (possibleReferences) {
            const foundPossibleRefrence = possibleReferences.find((ref) => ref.id === test.id);
            if (foundPossibleRefrence) {
              foundPossibleRefrence.isSelected = !foundPossibleRefrence.isSelected;
            } else {
              possibleReferences.push(foundPossibleRefrence);
            }
            this.possibleReferencesService.setPossibleReferencesMapElement(
              this.profileId,
              this.elementId,
              possibleReferences
            );
          }
        })
      )
      .subscribe();
    console.log('test', test);
  }
}
