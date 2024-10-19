import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeasibilityQueryProviderService } from '../../../../service/Provider/FeasibilityQueryProvider.service';
import { first, Observable, Subscription } from 'rxjs';
import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { SavedFeasibilityQueryService } from '../../services/SavedFeasibilityQuery.service';
import { StructuredQuery2FeasibilityQueryService } from '../../../../service/Translator/StructureQuery/StructuredQuery2FeasibilityQuery.service';
@Component({
  selector: 'num-feasibility',
  templateUrl: './feasibility.component.html',
  styleUrls: ['./feasibility.component.scss'],
})
export class FeasibilityComponent implements OnInit, OnDestroy {
  savedQueries$: Observable<InterfaceSavedQueryTile[]>;
  loadSubscription: Subscription;
  constructor(
    private savedFeasibilityQueryService: SavedFeasibilityQueryService,
    private translator: StructuredQuery2FeasibilityQueryService,
    private feasibilityQueryService: FeasibilityQueryProviderService,
    private navigationHelperService: NavigationHelperService
  ) {}

  ngOnInit() {
    this.loadSavedQueries();
  }

  ngOnDestroy() {
    this.loadSubscription?.unsubscribe();
  }
  private loadSavedQueries() {
    this.savedQueries$ = this.savedFeasibilityQueryService.loadSavedQueries();
  }

  public deleteSavedFeasibility(id: string) {
    this.savedFeasibilityQueryService
      .deleteQuery(Number(id))
      .pipe(first())
      .subscribe(() => {
        this.loadSavedQueries();
      });
  }

  loadQueryIntoEditor(id: string) {
    this.loadSubscription = this.savedFeasibilityQueryService
      .loadQueryIntoEditor(Number(id))
      .subscribe((structuredQuery) => {
        this.translator.translate(structuredQuery.content).subscribe((feasibilityQuery) => {
          this.feasibilityQueryService.setFeasibilityQueryByID(
            feasibilityQuery,
            feasibilityQuery.getID(),
            true
          );
        });
        this.navigationHelperService.navigateToDataQueryEditor();
      });
  }
}
