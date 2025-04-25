import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { StagedReferenceFieldProviderService } from 'src/app/service/Provider/StagedReferenceFieldProvider.service';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { SelectedReferenceFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedReferenceFieldsCloner';

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

  urlTree: TreeNode[][] = [];

  possibleReferences: DataSelectionProfile[][] = [];

  constructor(
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  ngOnInit(): void {
    console.log(this.selectedReferenceFields);
    this.initializeUrlTree();
    this.getPossibleReferences();
  }

  private initializeUrlTree(): void {
    this.urlTree = this.referencedFields.map((field) =>
      ProfileReferenceAdapter.adapt(field.getReferencedProfileUrls())
    );
  }

  public updateSelectedReferenceFields(selectedNode: TreeNode, reference: ReferenceField): void {
    const profileId = this.profileId;
    const url = selectedNode.originalEntry;
    const elementId = reference.getElementId();
    this.stagedReferenceFieldProviderService.addUrlToReferenceField(url, profileId, elementId);
  }

  /**
   * Processes the reference field by either adding or removing the URL.
   * @param map - The staged reference profile URLs map.
   * @param url - The URL to process.
   * @param elementId - The element ID of the reference field.
   */
  private processReferenceField(
    referenceMap: Map<string, Map<string, string[]>>,
    url: string,
    elementId: string
  ): void {
    const profileMap = referenceMap.get(this.profileId);
    if (!profileMap) {
      console.warn(`No profile map found for profile ID: ${this.profileId}`);
      return;
    }

    const existingUrls = profileMap.get(elementId) || [];
    const isUrlExisting = existingUrls.includes(url);

    if (isUrlExisting) {
      this.stagedReferenceFieldProviderService.removeUrlFromReferenceField(
        url,
        this.profileId,
        elementId
      );
    } else {
      this.stagedReferenceFieldProviderService.addUrlToReferenceField(
        url,
        this.profileId,
        elementId
      );
    }
  }

  getPossibleReferences() {
    this.possibleReferences = [];
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      this.urlTree.forEach((urls) => {
        this.possibleReferences.push(
          dataSelection.getProfiles().filter((profile) => (
              urls.filter((referencedUrl) => profile.getUrl() === referencedUrl.id && profile.getId() !== this.profileId).length > 0
            ))
        );
      });
    });
    console.log('bla');
    console.log(this.possibleReferences);
  }

  test(profileId: string, referencedField: ReferenceField) {
    console.log(profileId);
    this.selectedReferenceFields.forEach((selectedReferenceField) => {
      if (selectedReferenceField.getElementId() === referencedField.getElementId()) {
        const profileIds = selectedReferenceField.getLinkedProfileIds();
        const mergedProfileIds = [...profileIds, profileId];
        selectedReferenceField.setLinkedProfileIds(mergedProfileIds);
      }
    });
    const test = SelectedReferenceFieldsCloner.deepCopySelectedReferenceFields(
      this.selectedReferenceFields
    );

    console.log(test);
  }
}
