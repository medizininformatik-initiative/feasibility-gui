import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { PathSegments } from 'src/app/app-paths';
import { PossibleReferencesService } from 'src/app/service/PossibleReferences.service';
import { StagedProfileService } from 'src/app/service/StagedDataSelectionProfile.service';

@Component({
  selector: 'num-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit, OnDestroy {
  criterion$: Observable<Criterion>;

  deepCopyCriterion: Criterion;

  id: string;
  type: string;

  routeSubscription: Subscription;

  buildProfileSubscription: Subscription;

  constructor(
    private criterionProviderService: CriterionProviderService,
    private navigationHelperService: NavigationHelperService,
    private activatedRoute: ActivatedRoute,
    private stagedProfileService: StagedProfileService,
    private possibleReferencesService: PossibleReferencesService
  ) {}

  ngOnInit(): void {
    this.routeSubscription?.unsubscribe();
    this.routeSubscription = combineLatest([this.activatedRoute.paramMap, this.activatedRoute.url])
      .pipe(
        switchMap(([paramMap, url]) => {
          const id = paramMap.get('id');
          const type = url[0]?.path;

          if (id && type) {
            this.id = id;
            this.type = type;
            this.getElementFromProvider();
            return this.possibleReferencesService.initialize(id);
          }
          return of(undefined);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.routeSubscription?.unsubscribe();
    this.buildProfileSubscription?.unsubscribe();
  }

  private getElementFromProvider(): void {
    if (this.isCriterion()) {
      this.getCriterionFromProviderById(this.id);
    }
  }

  private getCriterionFromProviderById(id: string): void {
    this.criterion$ = of(this.criterionProviderService.getCriterionByUID(id));
  }

  public updateCriterion(criterion: Criterion): void {
    this.deepCopyCriterion = criterion;
  }

  public saveElement(): void {
    if (this.isProfile()) {
      this.buildProfileSubscription?.unsubscribe();
      this.buildProfileSubscription = this.stagedProfileService
        .buildProfile()
        .pipe(take(1))
        .subscribe();
    }
  }

  public onCancel(): void {
    if (this.isProfile()) {
      this.possibleReferencesService.clearPossibleReferencesMap();
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
