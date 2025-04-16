import { ProfileReferenceAdapter } from 'src/app/shared/models/TreeNode/Adapter/ProfileReferenceAdapter';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StagedReferenceProfileUrlsProviderService } from 'src/app/service/Provider/StagedReferenceProfileUrlsProvider.service';
import { map, take } from 'rxjs';

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

  urlTree: TreeNode[][] = [];

  constructor(
    private stagedReferenceProfileUrlsProviderService: StagedReferenceProfileUrlsProviderService
  ) {}

  ngOnInit(): void {
    this.initializeUrlTree();
  }

  private initializeUrlTree(): void {
    this.urlTree = this.referencedFields.map((field) =>
      ProfileReferenceAdapter.adapt(field.getReferencedProfileUrls())
    );
  }

  public updateSelectedReferenceFields(selectedNode: TreeNode): void {
    const selectedField = this.findMatchingReferenceField(selectedNode);
    if (!selectedField) {
      return;
    }
    const url = selectedNode.originalEntry;
    const elementId = selectedField.getElementId();
    this.stagedReferenceProfileUrlsProviderService
      .getStagedReferenceProfileUrlsMap()
      .pipe(
        take(1),
        map((referenceMap) => this.processReferenceField(referenceMap, url, elementId))
      )
      .subscribe();
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
      this.stagedReferenceProfileUrlsProviderService.removeUrlFromReferenceField(
        url,
        this.profileId,
        elementId
      );
    } else {
      this.stagedReferenceProfileUrlsProviderService.addUrlToReferenceField(
        url,
        this.profileId,
        elementId
      );
    }
  }

  private findMatchingReferenceField(selectedNode: TreeNode): ReferenceField | undefined {
    return this.referencedFields.find((field) =>
      field.getReferencedProfileUrls().some((url) => url === selectedNode.originalEntry)
    );
  }
}
