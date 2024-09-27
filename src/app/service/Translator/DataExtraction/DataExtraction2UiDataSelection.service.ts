import { CreateDataSelectionProfileProfile } from '../../DataSelection/CreateDataSelectionProfileProfile.service';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionFilterType } from 'src/app/model/Utilities/DataSelectionFilterType';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { DataSelectionUIType } from 'src/app/model/Utilities/DataSelectionUIType';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { ProfileTimeRestrictionFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileDateFilter';
import { ProfileTokenFilter } from 'src/app/model/DataSelection/Profile/Filter/ProfileTokenFilter';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { UITimeRestrictionFactoryService } from '../Shared/UITimeRestrictionFactory.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DataExtraction2UiDataSelectionService {
  constructor(
    private dataSelectionProvider: DataSelectionProviderService,
    private createDataSelection: CreateDataSelectionProfileProfile,
    private uITimeRestrictionFactoryService: UITimeRestrictionFactoryService
  ) {}

  /**
   * @todo Check if version is part of the dataExtraction.attributeGroups.filter.codes
   * @param dataExtraction
   */
  public translate(dataExtraction?: any): void {
    dataExtraction = this.test;
    if (dataExtraction.dataExtraction.attributeGroups?.length > 0) {
      const urls = dataExtraction.dataExtraction.attributeGroups.map(
        (attributeGroup) => attributeGroup.groupReference
      );
      this.createDataSelection
        .getDataSelectionProfileProfileData(urls)
        .pipe(
          map((dataSelectionProfiles) => {
            dataSelectionProfiles.forEach((dataSelectionProfile) => {
              const externDataSelectionProfile = dataExtraction.dataExtraction.attributeGroups.find(
                (attributeGroup) => attributeGroup.groupReference === dataSelectionProfile.getUrl()
              );
              this.setDataSectionProfileFields(
                externDataSelectionProfile.attributes,
                dataSelectionProfile.getFields()
              );
              this.setDataSelectionFilter();

              const profileTokenFilter = externDataSelectionProfile.filter?.map(
                (externSingleFilter) => {
                  if (externSingleFilter.type === DataSelectionFilterType.TOKEN) {
                    const codeFilter = dataSelectionProfile
                      .getFilters()
                      .find(
                        (singleFilter) => singleFilter.getName() === externSingleFilter.name
                      ) as ProfileTokenFilter;
                    return new ProfileTokenFilter(
                      externSingleFilter.name,
                      externSingleFilter.type,
                      codeFilter.getValueSetUrls(),
                      externSingleFilter.codes.map(
                        (code) =>
                          new TerminologyCode(code.code, code.display, code.system, code.version)
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
            });
            return dataSelectionProfiles;
          })
        )
        .subscribe((dataSelectionProfiles) => {
          const dataSelection = new DataSelection(dataSelectionProfiles, uuidv4());
          this.dataSelectionProvider.setDataSelectionByUID(dataSelection.getId(), dataSelection);
        });
    }
  }

  private setDataSectionProfileFields(attributes: any[], fields: ProfileFields[]) {
    fields.forEach((field) => {
      const foundattribute = attributes.find(
        (attribute) => attribute.attributeRef === field.getId()
      );
      if (foundattribute) {
        field.setIsSelected(true);
        field.setIsRequired(foundattribute.mustHave);
      }
      if (field.getChildren().length > 0) {
        this.setDataSectionProfileFields(attributes, field.getChildren());
      }
    });
  }

  private setDataSelectionFilter() {}

  test = {
    display: '',
    version: 'http://json-schema.org/to-be-done/schema#',
    cohortDefinition: {
      version: 'http://to_be_decided.com/draft-1/schema#',
      display: 'Ausgewählte Merkmale',
    },
    dataExtraction: {
      attributeGroups: [
        {
          groupReference:
            'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ObservationLab',
          attributes: [
            {
              attributeRef: 'Observation.status',
              mustHave: false,
            },
            {
              attributeRef: 'Observation.category',
              mustHave: true,
            },
          ],
          filter: [
            {
              type: 'token',
              name: 'code',
              codes: [
                {
                  code: '45197-1',
                  display: 'Decanoylcarnitine (C10) [Moles/volume] in DBS',
                  system: 'http://loinc.org',
                  version: '2099',
                },
                {
                  code: '45198-9',
                  display: 'Decenoylcarnitine (C10:1) [Moles/volume] in DBS',
                  system: 'http://loinc.org',
                  version: '2099',
                },
              ],
            },
            {
              type: 'date',
              name: 'date',
              start: '2024-09-04',
            },
          ],
        },
        {
          groupReference:
            'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/ServiceRequestLab',
          attributes: [
            {
              attributeRef: 'ServiceRequest.identifier',
              mustHave: false,
            },
          ],
          filter: [
            {
              type: 'date',
              name: 'date',
              start: '2024-09-04',
            },
          ],
        },
      ],
    },
  };

  test2 = {
    display: '',
    version: 'http://json-schema.org/to-be-done/schema#',
    cohortDefinition: {
      version: 'http://to_be_decided.com/draft-1/schema#',
      display: 'Ausgewählte Merkmale',
    },
    dataExtraction: {
      attributeGroups: [
        {
          groupReference:
            'https://www.medizininformatik-initiative.de/fhir/core/modul-labor/StructureDefinition/DiagnosticReportLab',
          attributes: [
            {
              attributeRef: 'DiagnosticReport.identifier',
              mustHave: false,
            },
            {
              attributeRef: 'DiagnosticReport.basedOn',
              mustHave: false,
            },
            {
              attributeRef: 'DiagnosticReport.status',
              mustHave: false,
            },
            {
              attributeRef: 'DiagnosticReport.category.coding:loinc-lab',
              mustHave: false,
            },
            {
              attributeRef: 'DiagnosticReport.category.coding:diagnostic-service-sections',
              mustHave: false,
            },
          ],
        },
      ],
    },
  };
}
