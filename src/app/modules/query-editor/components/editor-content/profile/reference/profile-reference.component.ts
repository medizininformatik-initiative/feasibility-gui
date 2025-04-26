import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { PossibleProfileReferenceData } from 'src/app/model/Interface/PossibleProfileReferenceData';
import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
import { ProfileReferenceModalService } from 'src/app/service/DataSelection/ProfileReferenceModal.service';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';
import { StagedReferenceFieldProviderService } from 'src/app/service/Provider/StagedReferenceFieldProvider.service';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-profile-reference',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-reference.component.html',
  styleUrls: ['./profile-reference.component.scss'],
})
export class ProfileReferenceComponent implements OnInit {
  @Input()
  referencedFields: ReferenceField[] = [];

  @Input()
  profileId: string;

  @Input()
  selectedReferenceFields: SelectedReferenceField[];

  @Output()
  updatedSelectedReferenceFields: EventEmitter<SelectedReferenceField[]> = new EventEmitter<
    SelectedReferenceField[]
  >();

  urlTree: TreeNode[][] = [];

  possibleReferences: PossibleProfileReferenceData[][] = [];

  constructor(
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private profileReferenceModalService: ProfileReferenceModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeUrlTree();
    this.getPossibleReferences();
  }

  private initializeUrlTree(): void {
    this.urlTree = this.referencedFields.map((field) =>
      ProfileReferenceAdapter.adapt(field.getReferencedProfileUrls())
    );
  }

  public updateSelectedReferenceFields(selectedNode: TreeNode, reference: ReferenceField): void {
    const url = selectedNode.originalEntry;
    const elementId = reference.getElementId();
    this.stagedReferenceFieldProviderService.addUrlToReferenceField(url, this.profileId, elementId);
  }

  public openReferenceModal(possibleReferences: TreeNode[], existing: number): void {
    this.profileReferenceModalService
      .openProfileReferenceModal(possibleReferences)
      .subscribe((result: TreeNode[]) => {
        this.treeNodesToPossibleReferences(result, existing);
      });
  }

  private treeNodesToPossibleReferences(nodes: TreeNode[], existing: number) {
    if (!this.possibleReferences[existing]) {
      this.possibleReferences[existing] = [];
    }
    nodes.forEach((node) => {
      this.possibleReferences[existing].push({
        id: node.id,
        label: undefined,
        display: this.createDisplay(node.data.display),
        url: node.id,
        isSelected: true,
      });
    });
    this.cdr.detectChanges();
  }

  private createDisplay(display: string) {
    const translations = [];
    const german = new Translation('de-DE', display, []);
    const eng = new Translation('en-US', display, []);
    translations.push(german);
    translations.push(eng);
    return new Display(translations, display, []);
  }

  private getPossibleReferences() {
    this.possibleReferences = [];
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      this.urlTree.forEach((urls, index) => {
        const profiles = dataSelection.getProfiles();
        this.possibleReferences.push(
          this.setPossibleReferences(profiles, index).filter(
            (possibleProfile) =>
              urls.filter(
                (referencedUrl) =>
                  possibleProfile.url === referencedUrl.id && possibleProfile.id !== this.profileId
              ).length > 0
          )
        );
      });
    });
  }

  private setPossibleReferences(
    profiles: DataSelectionProfile[],
    index: number
  ): PossibleProfileReferenceData[] {
    let selected = false;
    const foundField = this.selectedReferenceFields.find(
      (field) => field.getElementId() === this.referencedFields[index].getElementId()
    );
    return profiles.map((profile) => {
      if (foundField) {
        selected = foundField.getLinkedProfileIds().includes(profile.getId());
      }
      return {
        id: profile.getId(),
        label: profile.getLabel(),
        display: profile.getDisplay(),
        url: profile.getUrl(),
        isSelected: selected,
      };
    });
  }

  public setSelectedReference(profileId: string, referencedField: ReferenceField): void {
    const existingField = this.findSelectedField(referencedField);
    if (!existingField) {
      this.addNewSelectedField(profileId, referencedField);
    } else {
      this.appendProfileId(existingField, profileId);
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
