import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadFeasibilityQueryService } from 'src/app/service/DownloadFeasibilityQuery.service';

@Component({
  selector: 'num-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.scss'],
})
export class DataQueryComponent {
  fileName: string;

  constructor(
    private router: Router,
    private downloadFeasibilityQueryService: DownloadFeasibilityQueryService
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
    this.downloadFeasibilityQueryService.downloadActiveFeasibilityQueryAsFile();
  }

  public editFeasibilityQuery() {}
}
