import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Observable, of, Subscription } from 'rxjs';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { PathSegments } from 'src/app/app-paths';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { ProfileProviderIteratorService } from 'src/app/service/ProfileProviderIteratorService.service';

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

  nextElementExists$: Observable<boolean>;
  previousElementExists$: Observable<boolean>;

  constructor(
    private terminologySystemProvider: TerminologySystemProvider,
    private criterionProviderService: CriterionProviderService,
    private navigationHelperService: NavigationHelperService,
    private route: ActivatedRoute,
    private profileProviderIteratorService: ProfileProviderIteratorService,
    private profileProviderService: ProfileProviderService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(() => {
      const url = this.route.snapshot.url;
      this.type = url[0].path;
      this.id = url[1].path;
      this.getElementFromProvider();

      this.nextElementExists$ = this.profileProviderIteratorService.getNextElementExists(this.id);
      this.previousElementExists$ = this.profileProviderIteratorService.getPreviousElementExists(
        this.id
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
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

  public navigateToNextProfile(): void {
    this.profileProviderIteratorService.navigateToNextProfile(this.id);
  }

  public navigateToPreviousProfile(): void {
    this.profileProviderIteratorService.navigateToPreviousProfile(this.id);
  }

  public updateProfile(profile: DataSelectionProfile): void {
    this.deepCopyProfile = profile;
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
