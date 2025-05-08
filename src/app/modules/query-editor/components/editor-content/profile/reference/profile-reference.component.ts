import { map, Subscription } from 'rxjs';
import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';
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
    /*
    this.possibleReferencesServiceSubscription = this.possibleReferencesService.getPossibleReferencesMap().pipe(
      map((possibleRefrenceMap) =>{
        const exists = possibleRefrenceMap.get(this.profileId)
        if(!exists) {
          return this.possibleReferencesService.initialize(this.profileId)
        } else {
          return possibleRefrenceMap.get(this.profileId)
        }

      }),
    ).subscribe()*/
  }

  ngOnDestroy(): void {
    this.possibleReferencesServiceSubscription?.unsubscribe();
  }

  public setSelectedReference(
    selectedReferenceField: SelectedReferenceField,
    referencedField: ReferenceField
  ): void {
    const linkedProfileIds = selectedReferenceField.getLinkedProfileIds();
    const len = linkedProfileIds.length;
    const index = this.findSelectedField(referencedField);
    if (len > 0) {
      if (index !== -1) {
        this.selectedReferenceFields[index] = selectedReferenceField;
      } else {
        this.selectedReferenceFields.push(selectedReferenceField);
      }
    } else if (index !== -1) {
      this.selectedReferenceFields.splice(index, 1);
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
