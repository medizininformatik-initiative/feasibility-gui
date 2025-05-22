import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { FieldsTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/FieldTreeAdapter';
import { map, Subscription } from 'rxjs';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedProfileFieldsService } from 'src/app/service/DataSelection/SelectedProfileFields.service';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectedBasicFieldCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFields/SelectedFieldCloner';

@Component({
  selector: 'num-edit-fields',
  templateUrl: './edit-fields.component.html',
  styleUrls: ['./edit-fields.component.scss'],
  providers: [SelectedProfileFieldsService],
})
export class EditFieldsComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  fieldTree: BasicField[];

  @Input()
  selectedBasicFields: SelectedBasicField[];

  @Output()
  updatedSelectedBasicFields: EventEmitter<SelectedBasicField[]> = new EventEmitter<
    SelectedBasicField[]
  >();

  tree: TreeNode[] = [];
  deepCopyFieldsSubscription: Subscription;
  constructor(private selectedDataSelectionProfileFieldsService: SelectedProfileFieldsService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.traversAndUpddateTree();
    this.buildTreeFromProfileFields();
  }

  ngOnDestroy(): void {
    this.deepCopyFieldsSubscription?.unsubscribe();
  }

  private buildTreeFromProfileFields(): void {
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(this.fieldTree);
    this.deepCopyFieldsSubscription?.unsubscribe();
    this.deepCopyFieldsSubscription = this.selectedDataSelectionProfileFieldsService
      .getDeepCopyBasicFields()
      .pipe(
        map((profileFields) => {
          this.setSelectedChildrenFields();
          this.tree = FieldsTreeAdapter.fromTree(profileFields);
        })
      )
      .subscribe();
  }

  public setSelectedChildrenFields() {
    this.selectedBasicFields.forEach((field) => {
      this.selectedDataSelectionProfileFieldsService.addToSelection(field);
    });
  }

  public traversAndUpddateTree() {
    this.selectedDataSelectionProfileFieldsService.updateSelectionStatus(
      this.fieldTree,
      this.selectedBasicFields
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
    return this.selectedBasicFields.findIndex(
      (selectedField) => selectedField.getSelectedField().getElementId() === elementId
    );
  }

  public setFieldAsRequired(selectedField: SelectedBasicField) {
    selectedField.setMustHave(!selectedField.getMustHave());
    this.emitUpdatedSelectedFields();
  }

  public removeSelectedField(node: SelectedBasicField): void {
    const index = this.getIndexInSelectedFields(node.getElementId());
    if (index !== -1) {
      this.spliceAndEmit(index);
    }
  }

  private spliceAndEmit(index: number): void {
    this.selectedBasicFields.splice(index, 1);
    this.emitUpdatedSelectedFields();
  }

  private addNodeToSelectedFields(node: BasicField): void {
    const selectedField = new SelectedBasicField(node, false);
    this.selectedBasicFields.push(selectedField);
    this.selectedDataSelectionProfileFieldsService.addToSelection(selectedField);
    this.emitUpdatedSelectedFields();
  }

  private emitUpdatedSelectedFields(): void {
    const clonedSelectedFields = SelectedBasicFieldCloner.deepCopySelectedBasicFields(
      this.selectedBasicFields
    );
    this.updatedSelectedBasicFields.emit(clonedSelectedFields);
    this.traversAndUpddateTree();
    this.selectedDataSelectionProfileFieldsService.setDeepCopyFields(this.fieldTree);
  }
}
