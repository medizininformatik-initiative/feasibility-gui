import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { PathSegments } from 'src/app/app-paths';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { StagedReferenceProfileUrlsProviderService } from 'src/app/service/Provider/StagedReferenceProfileUrlsProvider.service';

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
    private stagedReferenceProfileUrlsProviderService: StagedReferenceProfileUrlsProviderService
  ) {}

  ngOnInit(): void {
    this.stagedReferenceProfileUrlsProviderService
      .getStagedReferenceProfileUrlsMap()
      .subscribe((map) => console.log(map));
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
