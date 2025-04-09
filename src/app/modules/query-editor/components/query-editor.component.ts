import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { PathSegments } from 'src/app/app-paths';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { filter, map, Observable, of, Subscription } from 'rxjs';
import { ProviderNavigationService } from 'src/app/service/ProviderNavigation.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';

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

  id: string;

  type: string;

  routeSubscription: Subscription;

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private criterionProviderService: CriterionProviderService,
    private route: ActivatedRoute,
    private profileProviderService: ProfileProviderService,
    private providerNavigationService: ProviderNavigationService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      const url = this.route.snapshot.url;
      this.type = url[0].path;
      this.id = url[1].path;
      this.getElementFromProvider();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private getElementFromProvider(): void {
    if (this.type === PathSegments.profile) {
      this.getProfileFromProviderById(this.id);
    } else if (this.type === PathSegments.criterion) {
      this.getCriterionFromProviderById(this.id);
    }
  }

  private getCriterionFromProviderById(id: string): void {
    this.criterion$ = of(this.criterionProviderService.getCriterionByUID(id));
  }

  private getProfileFromProviderById(id: string): void {
    this.profile$ = this.profileProviderService
      .getProfileIdMap()
      .pipe(map((profileMap) => profileMap.get(id)));
  }

  public updateProfile(profile: DataSelectionProfile) {
    this.deepCopyProfile = profile;
  }

  public saveElement() {
    if (this.isProfile() && this.deepCopyProfile) {
      this.profileProviderService.setProfileById(this.deepCopyProfile.getId(), this.deepCopyProfile);
    } else if (this.isCriterion()) {
      console.log('Saving criterion...');
    }
  }

  public previousElement() {
    if (this.isProfile()) {
      this.navigateToPreviousProfile(this.id);
    }
  }

  public nextElement() {
    if (this.isProfile()) {
      this.navigateToNextProfile(this.id);
    }
  }
  public navigateToNextProfile(currentId: string): void {
    this.profileProviderService
      .getProfileIdMap()
      .pipe(
        map((profileMap) => {
          const profile = this.providerNavigationService.getNextElementFromMap(
            profileMap,
            currentId
          );
          if (profile) {
            this.navigationHelperService.navigateToEditProfile(profile.getId());
          }
        })
      )
      .subscribe();
  }

  public navigateToPreviousProfile(currentId: string): void {
    this.profileProviderService
      .getProfileIdMap()
      .pipe(
        map((profileMap) => {
          const profile = this.providerNavigationService.getPreviousElementFromMap(
            profileMap,
            currentId
          );
          if (profile) {
            this.navigationHelperService.navigateToEditProfile(profile.getId());
          }
        })
      )
      .subscribe();
  }

  public onCancel() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  private isProfile(): boolean {
    return this.type === PathSegments.profile;
  }

  private isCriterion(): boolean {
    return this.type === PathSegments.criterion;
  }
}
