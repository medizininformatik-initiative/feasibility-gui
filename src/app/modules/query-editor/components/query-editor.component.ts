import { ActivatedRoute } from '@angular/router';
import { ActiveDataSelectionService } from 'src/app/service/Provider/ActiveDataSelection.service';
import { combineLatest, map, Observable, of, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionCloner } from 'src/app/model/Utilities/DataSelecionCloner/DataSelectionCloner';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { DataSelectionProviderService } from '../../data-selection/services/DataSelectionProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { PathSegments } from 'src/app/app-paths';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';
import { StagedReferenceFieldProviderService } from 'src/app/service/Provider/StagedReferenceFieldProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { CreateSelectedReferenceService } from 'src/app/service/CreateSelectedReference.service';

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
    private activeDataSelectionService: ActiveDataSelectionService,
    private dataSelectionProviderService: DataSelectionProviderService,
    private terminologySystemProvider: TerminologySystemProvider,
    private criterionProviderService: CriterionProviderService,
    private navigationHelperService: NavigationHelperService,
    private activatedRoute: ActivatedRoute,
    private profileProviderService: ProfileProviderService,
    private saveElementService: CreateSelectedReferenceService,
    private stagedReferenceFieldProviderService: StagedReferenceFieldProviderService
  ) {}

  ngOnInit(): void {
    this.routeSubscription?.unsubscribe();
    this.routeSubscription = combineLatest([this.activatedRoute.paramMap, this.activatedRoute.url])
      .pipe(
        tap(([paramMap, url]) => {
          const id = paramMap.get('id');
          const type = url[0]?.path;

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
      this.stagedReferenceFieldProviderService.initialize(this.id);
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
    const profile = this.profileProviderService.getProfileById(this.id);
    this.saveElementService
      .getSelectedReferenceFields(profile)
      .subscribe((selectedReferenceFields) => {
        const clonedProfile = DataSelectionCloner.deepCopyProfile(profile);
        const existingFields = clonedProfile.getProfileFields().getSelectedReferenceFields();
        const mergedFields = [...existingFields, ...selectedReferenceFields];
        clonedProfile.getProfileFields().setSelectedReferenceFields(mergedFields);
        this.profileProviderService.setProfileById(clonedProfile.getId(), clonedProfile);
        const dataSelectionId = this.activeDataSelectionService.getActiveDataSelectionId();
        this.dataSelectionProviderService.setProfileInDataSelection(dataSelectionId, clonedProfile);
      });
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
