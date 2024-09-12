import { Component, OnInit } from '@angular/core';
import { QueryResult } from '../../../../../model/Result/QueryResult';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveQueryModalComponent } from '../save-dialog/save-dialog.component';
import { UIQuery2StructuredQueryService } from 'src/app/service/Translator/StructureQuery/UIQuery2StructuredQuery.service';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { FileSaverService } from 'ngx-filesaver';
import { BackendService } from '../../../service/backend.service';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
@Component({
  selector: 'num-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  querySlotAvailable = false;
  gottenDetailedResult: boolean;
  result: QueryResult;
  resultUrl: string;
  loadedResult = false;
  callsLimit: number;
  callsRemaining: number;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private feasibilityQueryProviderService: FeasibilityQueryProviderService,
    private fileSaverService: FileSaverService,
    private backendService: BackendService,
    private sqTranslatorService: UIQuery2StructuredQueryService
  ) {}

  ngOnInit() {}

  public editStage(): void {
    this.router.navigate(['/querybuilder/editor'], { state: { jumpToStage: true } });
  }

  saveQuery() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(SaveQueryModalComponent, dialogConfig);
  }

  public doDownloadQuery() {
    this.feasibilityQueryProviderService
      .getFeasibilityQueryByID('1')
      .subscribe((feasibilityQuery) => {
        this.fileSaverService.save(
          this.createFileData(feasibilityQuery),
          this.createFilename() + '.json'
        );
      });
  }

  private createFilename(): string {
    const filename =
      'CCDL_' +
      new Date().toLocaleDateString('de-DE') +
      '_' +
      new Date().toLocaleTimeString('de-DE');
    return filename;
  }

  private createFileData(feasibilityQuery: FeasibilityQuery) {
    const queryString = JSON.stringify(
      this.sqTranslatorService.translateToStructuredQuery(feasibilityQuery)
    );
    return new Blob([queryString], { type: 'text/plain;charset=utf-8' });
  }

  public isQuerySlotAvailable(): void {
    this.backendService.getSavedQuerySlotCount().subscribe((querySlotCount) => {
      this.querySlotAvailable = querySlotCount.total > querySlotCount.used ? true : false;
    });
  }
}
