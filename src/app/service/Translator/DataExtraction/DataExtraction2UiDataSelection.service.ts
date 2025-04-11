import { CreateDataSelectionProfileService } from '../../DataSelection/CreateDataSelectionProfile.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionFilterType } from 'src/app/model/Utilities/DataSelectionFilterType';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { v4 as uuidv4 } from 'uuid';
import { ProfileReference } from 'src/app/model/DataSelection/Profile/Reference/ProfileReference';
import { TypeGuard } from '../../TypeGuard/TypeGuard';
import { Concept } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/Concept';
import { Display } from '../../../model/DataSelection/Profile/Display';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';

@Injectable({
  providedIn: 'root',
})
export class DataExtraction2UiDataSelectionService {
  constructor(
    private createDataSelection: CreateDataSelectionProfileService,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  /**
   * @todo Check if version is part of the dataExtraction.attributeGroups.filter.codes
   * @param dataExtraction
   */
  public translate(dataExtraction: any): Observable<DataSelection> {
    if (dataExtraction.attributeGroups?.length > 0) {
      const urls = dataExtraction.attributeGroups.map(
        (attributeGroup) => attributeGroup.groupReference
      );
      return this.createDataSelection.fetchDataSelectionProfileData(urls, false, false).pipe(
        map((dataSelectionProfiles) => {
          dataSelectionProfiles.forEach((dataSelectionProfile) => {
            const externDataSelectionProfile = dataExtraction.attributeGroups.find(
              (attributeGroup) => attributeGroup.groupReference === dataSelectionProfile.getUrl()
            );

            if (externDataSelectionProfile === undefined) {
              return;
            }
            /*  const selectedFields: SelectedField[] = this.setDataSectionProfileFields(
              externDataSelectionProfile.attributes,
              dataSelectionProfile.getProfileFields().getSelectedBasicFields()
            );
            dataSelectionProfile.getProfileFields().setSelectedBasicFields(selectedFields); */
            if (TypeGuard.isFilterDataArray(externDataSelectionProfile.filter)) {
              const profileTokenFilter = externDataSelectionProfile.filter?.map(
                (externSingleFilter) => {
                  if (externSingleFilter.type === DataSelectionFilterType.TOKEN) {
                    const codeFilter = dataSelectionProfile
                      .getFilters()
                      .find(
                        (singleFilter) => singleFilter.getName() === externSingleFilter.name
                      ) as ProfileTokenFilter;
                    return new ProfileTokenFilter(
                      uuidv4(),
                      externSingleFilter.name,
                      externSingleFilter.type,
                      codeFilter.getValueSetUrls(),
                      externSingleFilter.codes.map(
                        (code) =>
                          new Concept(
                            new Display([], code.display),
                            new TerminologyCode(code.code, code.display, code.system, code.version)
                          )
                      )
                    );
                  }
                  if (externSingleFilter.type === DataSelectionFilterType.DATE) {
                    const timeRestriction =
                      this.uITimeRestrictionFactoryService.createTimeRestrictionForDataSelection(
                        externSingleFilter
                      );
                    return new ProfileTimeRestrictionFilter(
                      externSingleFilter.name,
                      externSingleFilter.type,
                      timeRestriction
                    );
                  }
                }
              );
              dataSelectionProfile.setFilters(profileTokenFilter);
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

  /*   private setDataSectionProfileFields(attributes: any[], fields: ProfileFields): SelectedBasicField[] {
    return attributes.map((attribute) => new SelectedBasicField(
        this.getDataSectionProfileDisplay(attributes, fields),
        attribute.attributeRef,
        attribute.mustHave,
        attribute.linkedProfiles
      ));
  } */

  /*  private getDataSectionProfileDisplay(attributes: any[], fields: ProfileFields): Display {
    for (const field of fields.getFieldTree()) {
      const foundAttribute = attributes.find(
        (attribute) => attribute.attributeRef === field.getElementId()
      );
      if (foundAttribute) {
        return field.getDisplay();
      }
      if (field.getChildren().length > 0) {
        const childDisplay = this.getDataSectionProfileDisplay(attributes, field.getChildren());
        if (childDisplay) {
          return childDisplay;
        }
      }
    }
  } */
}
