import { AttributeGroupsData } from 'src/app/model/Interface/AttributeGroupsData';
import { AttributesData } from 'src/app/model/Interface/AttributesData';
import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { CreateDataSelectionProfileService } from '../../DataSelection/CreateDataSelectionProfile.service';
import { DataExtractionData } from 'src/app/model/Interface/DataExtractionData';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileFieldsCloner } from 'src/app/model/Utilities/DataSelecionCloner/ProfileFieldsCloner';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { ReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { TypeGuard } from '../../TypeGuard/TypeGuard';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { v4 as uuidv4 } from 'uuid';
import { ProfileFilterTranslatorService } from './ProfileFilterTranslator.service';

@Injectable({
  providedIn: 'root',
})
export class DataExtraction2UiDataSelectionService {
  private idMap: { oldId: string; newId: string }[] = [];
  constructor(
    private createDataSelection: CreateDataSelectionProfileService,
    private profileFilterTranslatorService: ProfileFilterTranslatorService,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  /**
   * @todo Check if version is part of the dataExtraction.attributeGroups.filter.codes
   * @param dataExtraction
   */
  public translate(dataExtraction: DataExtractionData): Observable<DataSelection> {
    if (dataExtraction.attributeGroups?.length > 0) {
      const urls = this.getGroupReferences(dataExtraction);
      return this.createDataSelection.fetchDataSelectionProfileData(urls, false).pipe(
        map((dataSelectionProfiles) => {
          this.replaceExternalIdsWithFetchedProfileIds(
            dataSelectionProfiles,
            dataExtraction.attributeGroups
          );

          dataSelectionProfiles.forEach((dataSelectionProfile) => {
            const externDataSelectionProfile = this.findExternalProfileFromIdMap(
              dataSelectionProfile,
              dataExtraction
            );
            dataSelectionProfile.setLabel(
              externDataSelectionProfile.name ?? dataSelectionProfile.getLabel().getOriginal()
            );
            const profileFields = dataSelectionProfile.getProfileFields();
            const attributes = externDataSelectionProfile.attributes;
            const updatedProfileFields = this.setProfileFields(attributes, profileFields);
            dataSelectionProfile.setProfileFields(updatedProfileFields);

            if (TypeGuard.isFilterDataArray(externDataSelectionProfile.filter)) {
              const profileFilter = this.profileFilterTranslatorService.createProfileFilters(
                externDataSelectionProfile,
                dataSelectionProfile
              );
              dataSelectionProfile.setFilters(profileFilter);
            }

            if (externDataSelectionProfile.includeReferenceOnly) {
              dataSelectionProfile.setReference(new ProfileReference(true, true));
            } else {
              dataSelectionProfile.setReference(new ProfileReference(true, false));
            }
          });
          return new DataSelection(dataSelectionProfiles, uuidv4());
        })
      );
    }
  }

  private findExternalProfileFromIdMap(
    profile: DataSelectionProfile,
    dataExtraction: DataExtractionData
  ): AttributeGroupsData | undefined {
    const idTupel = this.idMap.find((id) => id.newId === profile.getId());
    return dataExtraction.attributeGroups.find(
      (externProfile) => externProfile.id === idTupel.oldId
    );
  }

  private setProfileFields(
    attributes: AttributesData[],
    profileFields: ProfileFields
  ): ProfileFields {
    const seletectedReferenceFields: SelectedReferenceField[] = [];
    const seletectedBasicFields: SelectedBasicField[] = [];
    attributes.forEach((attribute) => {
      const attributeRef = attribute.attributeRef;
      if (attribute.linkedGroups && attribute.linkedGroups.length > 0) {
        const foundField = this.findReferenceField(profileFields.getReferenceFields(), attributeRef);
        seletectedReferenceFields.push(this.createSelectedReferenceField(attribute, foundField));
      } else {
        const foundField = this.findBasicField(profileFields.getFieldTree(), attributeRef);
        seletectedBasicFields.push(this.createSelecteBasicFields(foundField, attribute));
      }
    });
    profileFields.setSelectedBasicFields(seletectedBasicFields);
    profileFields.setSelectedReferenceFields(seletectedReferenceFields);
    return ProfileFieldsCloner.deepCopyProfileFields(profileFields);
  }

  private findBasicField(basicFields: BasicField[], attributeRef: string): BasicField | undefined {
    for (const field of basicFields) {
      if (field.getElementId() === attributeRef) {
        return field;
      } else if (field.getChildren().length > 0) {
        const result = this.findBasicField(field.getChildren(), attributeRef);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }

  private findReferenceField(
    referenceFields: ReferenceField[],
    attributeRef: string
  ): ReferenceField {
    return referenceFields.find((field) => field.getElementId() === attributeRef);
  }

  private createSelectedReferenceField(
    attribute: AttributesData,
    foundField: ReferenceField
  ): SelectedReferenceField {
    const linkedProfileIds = attribute.linkedGroups.map(
      (linkedGroup) =>
        this.idMap
          .map((id) => (id.oldId === linkedGroup ? id.newId : undefined))
          .filter((id) => id !== undefined)[0]
    );
    const selectedReferenceField = new SelectedReferenceField(
      foundField,
      linkedProfileIds,
      attribute.mustHave
    );
    return selectedReferenceField;
  }

  private createSelecteBasicFields(
    basicField: BasicField,
    attribute: AttributesData
  ): SelectedBasicField {
    const selectedBasicField = new SelectedBasicField(basicField, attribute.mustHave);
    return selectedBasicField;
  }

  private getGroupReferences(dataExtraction: DataExtractionData): string[] {
    return dataExtraction.attributeGroups.map((attributeGroup) => attributeGroup.groupReference);
  }

  private replaceExternalIdsWithFetchedProfileIds(
    dataSelectionProfiles: DataSelectionProfile[],
    externProfiles: AttributeGroupsData[]
  ): void {
    const remainingExternProfiles = [...externProfiles];

    dataSelectionProfiles.forEach((profile) => {
      const url = profile.getUrl();
      const index = remainingExternProfiles.findIndex((extern) => extern.groupReference === url);

      if (index !== -1) {
        const matchedExtern = remainingExternProfiles.splice(index, 1)[0];
        this.idMap.push({ oldId: matchedExtern.id, newId: profile.getId() });
      }
    });
  }
}
