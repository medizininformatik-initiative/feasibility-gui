import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileProfileNodeAdapter';
import { first, map } from 'rxjs';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedDataSelectionProfileFieldsService } from 'src/app/service/DataSelection/SelectedDataSelectionProfileFields.service';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-edit-fields',
  templateUrl: './edit-fields.component.html',
  styleUrls: ['./edit-fields.component.scss'],
  providers: [SelectedDataSelectionProfileFieldsService],
})
export class EditFieldsComponent implements OnInit {
  @Input()
  profile: DataSelectionProfile;

  @Input()
  fieldTree: BasicField[];

  @Output()
  updatedProfile: EventEmitter<DataSelectionProfile> = new EventEmitter<DataSelectionProfile>();

  tree: TreeNode[] = [];

  constructor(
    private profileProviderService: ProfileProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private activeDataSelectionService: ActiveDataSelectionService,
    private selectedDataSelectionProfileFieldsService: SelectedDataSelectionProfileFieldsService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService
  ) {}

  ngOnInit() {
    this.traversAndUpddateTree();
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(
      this.profile.getProfileFields().getFieldTree()
    );

    this.selectedDataSelectionProfileFieldsService
      .getDeepCopyBasicFields()
      .pipe(
        first(),
        map((profileFields) => {
          this.setSelectedChildrenFields(this.profile.getProfileFields().getSelectedBasicFields()); // Initialize selected fields
          this.tree = FieldsTreeAdapter.fromTree(profileFields); // Build the tree
        })
      )
      .subscribe();
  }

  public setSelectedChildrenFields(fields: SelectedBasicField[]) {
    fields.forEach((field) => {
      this.selectedDataSelectionProfileFieldsService.addToSelection(field);
    });
  }

  public traversAndUpddateTree() {
    this.selectedDataSelectionProfileFieldsService.updateSelectionStatus(
      this.profile.getProfileFields().getFieldTree(),
      this.profile.getProfileFields().getSelectedBasicFields()
    );
  }

  public setSelectedFieldElement(element) {
    const node: BasicField = element.originalEntry as BasicField;
    const index = this.getIndexInSelectedFields(node.getElementId());
    if (index !== -1) {
      this.spliceAndEmit(index);
    } else {
      this.addNodeToSelectedFields(node);
    }
    this.traversAndUpddateTree();
  }

  private getIndexInSelectedFields(elementId: string): number {
    return this.profile
      .getProfileFields()
      .getSelectedBasicFields()
      .findIndex((selectedField) => selectedField.getElementId() === elementId);
  }

  public setFieldAsRequired(selectedField: SelectedBasicField) {
    selectedField.setMustHave(!selectedField.getMustHave());
  }

  public removeSelectedField(node: BasicField): void {
    const index = this.getIndexInSelectedFields(node.getElementId());
    if (index !== -1) {
      this.spliceAndEmit(index);
    }
  }

  private spliceAndEmit(index: number): void {
    this.profile.getProfileFields().getSelectedBasicFields().splice(index, 1);
    this.traversAndUpddateTree();
    this.emitUpdatedSelectedFields();
  }

  private addNodeToSelectedFields(node: BasicField): void {
    node.setIsSelected(true);
    const selectedField = new SelectedBasicField(
      node.getDisplay(),
      node.getDescription(),
      node.getElementId(),
      false,
      node.getType()
    );
    this.profile.getProfileFields().getSelectedBasicFields().push(selectedField);
    this.selectedDataSelectionProfileFieldsService.addToSelection(selectedField);
    this.emitUpdatedSelectedFields();
  }

  private emitUpdatedSelectedFields(): void {
    this.updatedProfile.emit(this.profile); // Emit the updated fields
  }
}
