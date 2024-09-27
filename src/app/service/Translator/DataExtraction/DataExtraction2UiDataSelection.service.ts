import { Injectable } from '@angular/core';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { CreateDataSelectionProfileProfile } from '../../DataSelection/CreateDataSelectionProfileProfile.service';
import { map } from 'rxjs';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';

@Injectable({
  providedIn: 'root',
})
export class DataExtraction2UiDataSelectionService {
  constructor(
    private dataSelectionProvider: DataSelectionProviderService,
    private createDataSelection: CreateDataSelectionProfileProfile
  ) {}

  public translate(dataExtraction?: any): void {
    dataExtraction = this.test2;
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
            });
            console.log(dataSelectionProfiles);
          })
        )
        .subscribe();
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
