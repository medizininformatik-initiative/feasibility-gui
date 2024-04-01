import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/modules/querybuilder/service/backend.service';
import { FeatureService } from 'src/app/service/Feature.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Query } from 'src/app/model/FeasibilityQuery/Query';
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service';
import { QueryResult } from 'src/app/modules/querybuilder/model/api/result/QueryResult';
import { SaveDialogComponent } from './save/save-dialog/save-dialog.component';
@Component({
  selector: 'num-dataselection-editor',
  templateUrl: './dataselection-editor.component.html',
  styleUrls: ['./dataselection-editor.component.scss'],
})
export class DataselectionEditorComponent implements OnInit, AfterViewChecked {
  query: Query;

  storedQuery: QueryProviderService;

  actionDisabledSend: boolean;
  actionDisabledReset: boolean;

  result: QueryResult;

  gottenDetailedResult: boolean;

  loadedResult: boolean;

  callsLimit: number;
  callsRemaining: number;
  hasQuerySend: boolean | string = false;

  constructor(
    public featureService: FeatureService,
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (window.history.state.preventReset) {
      this.query = this.queryProviderService.query();
    } else {
      this.doReset();
    }
  }

  loadQuery($event) {
    this.query = $event;
  }
  storeQuery(query: Query): void {
    this.query = query;
    this.queryProviderService.store(query);
  }

  doShowStoredQuery(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      hasQuerySend: this.hasQuerySend,
    };
    this.dialog.open(SaveDialogComponent, dialogConfig);
  }

  doReset(): void {
    this.query = QueryProviderService.createDefaultQuery();
    this.queryProviderService.store(this.query);
    this.result = null;
    this.gottenDetailedResult = false;
    this.loadedResult = false;
    this.getDetailedResultRateLimit();
  }

  getDetailedResultRateLimit(): void {
    this.backend.getDetailedResultRateLimit().subscribe(
      (result) => {
        this.callsLimit = result.limit;
        this.callsRemaining = result.remaining;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewChecked(): void {
    this.actionDisabledSend = this.isActionDisabled('Send');
    this.actionDisabledReset = this.isActionDisabled('Reset');
    this.changeDetector.detectChanges();
  }

  isActionDisabled(button: string): boolean {
    if (button === 'Send') {
      return !(this.query.groups[0].inclusionCriteria.length > 0);
    }

    if (button === 'Reset') {
      return (
        !(this.query.groups[0].inclusionCriteria.length > 0) &&
        !(this.query.groups[0].exclusionCriteria.length > 0) &&
        !(this.query.groups.length > 1)
      );
    }
    return false;
  }
}
