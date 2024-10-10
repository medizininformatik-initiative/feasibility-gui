import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadCCDLService } from 'src/app/service/Download/DownloadCCDL.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import { CohortDefinitionComponent } from './cohort-definition/cohort-definition.component';
import { DataSelectionComponent } from './data-selection/data-selection.component';

@Component({
  selector: 'num-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.scss'],
})
export class DataQueryComponent {
  @ViewChild('cohort') cohort: CohortDefinitionComponent;
  @ViewChild('dataselection') dataselection: DataSelectionComponent;
  fileName: string;
  showActionBar = true;

  constructor(
    private router: Router,
    private downloadCCDLService: DownloadCCDLService,
    private test1: TerminologySystemProvider
  ) {}

  sendQuery() {
    this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
  }

  uploadCohort(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(file);
    this.fileName = file.name;
  }

  onReaderLoad(event): void {
    const importQuery = JSON.parse(event.target.result);
  }

  public doDownloadQuery() {
    this.downloadCCDLService.downloadActiveFeasibilityQueryAsFile();
  }

  public editFeasibilityQuery() {}

  scroll(event: boolean) {
    this.showActionBar = event;
    if (event) {
      if (this.cohort) {
        const element = this.cohort.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (this.dataselection) {
        const element = this.dataselection.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
