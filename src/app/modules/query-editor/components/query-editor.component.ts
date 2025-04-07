import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { map, Observable, of, tap } from 'rxjs';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit {
  currentUrl = '';

  criterion$: Observable<Criterion>;

  profile$: Observable<DataSelectionProfile>;

  deepCopyProfile: DataSelectionProfile;

  id: string;

  type: string;

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private criterionProviderService: CriterionProviderService,
    private route: ActivatedRoute,
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private profileProviderService: ProfileProviderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const url = this.route.snapshot.url;
      this.type = url[0].path;
      this.id = url[1].path;
    });
    this.createProfileById(this.id);
  }

  private getProfileFromProviderById(id: string): void {
    this.profile$ = of(this.profileProviderService.getProfileById(id));
  }

  private createProfileById(id: string): void {
    const testUrl =
      'https://www.medizininformatik-initiative.de/fhir/core/modul-diagnose/StructureDefinition/Diagnose';

    this.profile$ = this.createDataSelectionProfileService
      .fetchDataSelectionProfileData([testUrl])
      .pipe(
        map((data) => data[0]), // Extract the first profile from the response
        tap((profile) => {
          // Set the profile in the ProfileProviderService
          this.profileProviderService.setProfileById(profile.getId(), profile);
        })
      );
  }

  public updateProfile(profile: DataSelectionProfile) {
    this.deepCopyProfile = this.createNewProfileInstance(profile);
  }

  private createNewProfileInstance(profile: DataSelectionProfile): DataSelectionProfile {
    return new DataSelectionProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profile.getFields(),
      profile.getFilters(),
      profile.getReference(),
      profile.getSelectedFields()
    );
  }

  onSave() {
    this.profileProviderService.setProfileById(this.deepCopyProfile.getId(), this.deepCopyProfile);
    console.log('Saving query...');
    console.log(this.deepCopyProfile);
  }

  onCancel() {
    console.log('Cancelling query...');
  }
}
