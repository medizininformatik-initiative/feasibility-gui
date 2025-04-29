import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';
import { StagedReferenceFieldProviderService } from 'src/app/service/Provider/StagedReferenceFieldProvider.service';

@Component({
  selector: 'num-profile-reference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-reference.component.html',
  styleUrls: ['./profile-reference.component.scss'],
})
export class ProfileReferenceComponent implements OnInit {
  @Input() referenceFields: ReferenceField[];
  @Input() profileId: string;
  @Input() selectedReferenceFields: SelectedReferenceField[] = [];
  @Output() updatedSelectedReferenceFields = new EventEmitter<SelectedReferenceField[]>();

  constructor(private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService) {}

  ngOnInit(): void {
    this.stagedReferenceFieldProviderService.initialize(this.profileId);
  }

  public setSelectedReference(profileId: string, referencedField: ReferenceField): void {
    const existingField = this.findSelectedField(referencedField);
    if (existingField) {
      this.appendProfileId(existingField, profileId);
    } else {
      this.addNewSelectedField(profileId, referencedField);
    }
    this.emitUpdatedFields();
  }

  private addNewSelectedField(profileId: string, referencedField: ReferenceField): void {
    const newField = new SelectedReferenceField(referencedField, [profileId], false);
    this.selectedReferenceFields.push(newField);
  }

  private appendProfileId(field: SelectedReferenceField, profileId: string): void {
    const profileIds = field.getLinkedProfileIds();
    field.setLinkedProfileIds([...profileIds, profileId]);
  }

  private findSelectedField(referencedField: ReferenceField): SelectedReferenceField | undefined {
    return this.selectedReferenceFields.find(
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
