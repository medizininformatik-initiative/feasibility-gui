import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';
import { filter, Subscription, switchMap, take } from 'rxjs';
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
  selector: 'num-profile-reference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-reference.component.html',
  styleUrls: ['./profile-reference.component.scss'],
})
export class ProfileReferenceComponent implements OnInit, OnDestroy {
  @Input() referenceFields: ReferenceField[];
  @Input() profileId: string;
  @Input() selectedReferenceFields: SelectedReferenceField[] = [];
  @Output() updatedSelectedReferenceFields = new EventEmitter<SelectedReferenceField[]>();

  possibleReferencesServiceSubscription: Subscription;

  constructor(private possibleReferencesService: PossibleReferencesService) {}

  ngOnInit(): void {
    this.possibleReferencesServiceSubscription?.unsubscribe();
    this.possibleReferencesServiceSubscription = this.possibleReferencesService
      .getPossibleReferencesMap()
      .pipe(
        take(1),
        filter((possibleReferenceMap) => !possibleReferenceMap.has(this.profileId)),
        switchMap(() => this.possibleReferencesService.initialize(this.profileId).pipe(take(1)))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.possibleReferencesServiceSubscription?.unsubscribe();
  }

  public setSelectedReference(
    selectedReferenceField: SelectedReferenceField,
    referencedField: ReferenceField
  ): void {
    const indexOfSelectedField = this.findSelectedField(referencedField);
    if (indexOfSelectedField !== -1) {
      this.selectedReferenceFields[indexOfSelectedField] = selectedReferenceField;
    } else {
      this.selectedReferenceFields.push(selectedReferenceField);
    }
    this.emitUpdatedFields();
  }

  private findSelectedField(referencedField: ReferenceField): number | undefined {
    return this.selectedReferenceFields.findIndex(
      (field) => field.getElementId() === referencedField.getElementId()
    );
  }

  private emitUpdatedFields(): void {
    const clonedFields = SelectedReferenceFieldsCloner.deepCopySelectedReferenceFields(
      this.selectedReferenceFields
    );
    this.updatedSelectedReferenceFields.emit(clonedFields);
  }
}
