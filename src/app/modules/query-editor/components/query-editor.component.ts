import { ActivatedRoute } from '@angular/router';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { combineLatest, map, Observable, of, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateDataSelectionProfileService } from 'src/app/service/DataSelection/CreateDataSelectionProfile.service';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../../data-selection/services/DataSelectionProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { PathSegments } from 'src/app/app-paths';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { StagedReferenceProfileUrlsProviderService } from 'src/app/service/Provider/StagedReferenceProfileUrlsProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit, OnDestroy {
  currentUrl = '';

  criterion$: Observable<Criterion>;
  profile$: Observable<DataSelectionProfile>;

  deepCopyProfile: DataSelectionProfile;

  deepCopyCriterion: Criterion;

  id: string;
  type: string;

  routeSubscription: Subscription;

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private criterionProviderService: CriterionProviderService,
    private navigationHelperService: NavigationHelperService,
    private activatedRoute: ActivatedRoute,
    private profileProviderService: ProfileProviderService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private stagedReferenceProfileUrlsProviderService: StagedReferenceProfileUrlsProviderService,
    private createDataSelectionProfileService: CreateDataSelectionProfileService,
    private activeDataSelectionService: ActiveDataSelectionService
  ) {}

  ngOnInit(): void {
    this.routeSubscription?.unsubscribe();
    this.routeSubscription = combineLatest([this.activatedRoute.paramMap, this.activatedRoute.url])
      .pipe(
        tap(([paramMap, url]) => {
          const id = paramMap.get('id');
          const type = url[0]?.path; // first segment of the URL

          if (id && type) {
            this.id = id;
            this.type = type;
            this.getElementFromProvider();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  private getElementFromProvider(): void {
    if (this.isProfile()) {
      this.getProfileFromProviderById(this.id);
    } else if (this.isCriterion()) {
      this.getCriterionFromProviderById(this.id);
    }
  }

  private getCriterionFromProviderById(id: string): void {
    this.criterion$ = of(this.criterionProviderService.getCriterionByUID(id));
  }

  private getProfileFromProviderById(id: string): void {
    this.profile$ = of(this.profileProviderService.getProfileById(id));
  }

  public updateProfile(profile: DataSelectionProfile): void {
    this.deepCopyProfile = profile;
  }

  public updateCriterion(criterion: Criterion): void {
    this.deepCopyCriterion = criterion;
  }

  public saveElement(): void {
    this.stagedReferenceProfileUrlsProviderService
      .getStagedReferenceProfileUrlsMap()
      .pipe(
        tap((referenceMap) => {
          console.log('Reference Map:', referenceMap);
        }),
        map((profileMap) => {
          let urlsForBackend = [];
          const profileMapForId = profileMap.get(this.id);
          profileMapForId.forEach((fieldUrls, elementId) => {
            urlsForBackend = [...urlsForBackend, ...fieldUrls];
          });
          this.createDataSelectionProfileService
            .fetchDataSelectionProfileData(urlsForBackend)
            .pipe(
              map((profiles) => {
                profiles.forEach((dataSelectionProfile) => {
                  const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
                  this.dataSelectionProviderService.setProfileInDataSelection(
                    dataSelectionId,
                    dataSelectionProfile
                  );
                });
              })
            )
            .subscribe((test) => console.log(test));
        })
      )
      .subscribe();
    if (this.isProfile() && this.deepCopyProfile) {
      this.profileProviderService.setProfileById(this.deepCopyProfile.getId(), this.deepCopyProfile);
    } else if (this.isCriterion()) {
      console.log('Saving criterion...');
    }
  }

  public onCancel(): void {
    if (this.isProfile()) {
      this.navigationHelperService.navigateToDataSelectionEditor();
    } else if (this.isCriterion()) {
      this.navigationHelperService.navigateToFeasibilityQueryEditor();
    }
  }

  private isProfile(): boolean {
    return this.type === PathSegments.profile;
  }

  private isCriterion(): boolean {
    return this.type === PathSegments.criterion;
  }
}
