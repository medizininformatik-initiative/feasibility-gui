import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiTranslator } from 'src/app/modules/querybuilder/controller/ApiTranslator';
import { Query } from 'src/app/modules/querybuilder/model/api/query/query';
import { QueryProviderService } from 'src/app/modules/querybuilder/service/query-provider.service';

@Component({
  selector: 'num-upload-dataselection',
  templateUrl: './upload-dataselection.component.html',
  styleUrls: ['./upload-dataselection.component.scss'],
})
export class UploadDataselectionComponent implements AfterViewChecked {
  @Output()
  parentComponent = new EventEmitter();

  query: Query;
  importQuery: Query;
  fileName: string;
  actionDisabled: boolean;

  constructor(
    public queryProviderService: QueryProviderService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    if (this.importQuery) {
      this.actionDisabled = false;
    } else {
      this.actionDisabled = true;
    }
    this.changeDetector.detectChanges();
  }
  doImport(): void {
    this.query = new ApiTranslator().translateImportedDsToUIQuery(
      QueryProviderService.createDefaultQuery(),
      this.importQuery
    );
    this.queryProviderService.store(this.query);
    this.parentComponent.next('');
    this.router.navigate(['/dataselection/editor'], {
      onSameUrlNavigation: 'reload',
      state: { preventReset: true },
    });
  }

  doImportFromFile(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = this.onReaderLoad.bind(this);
    reader.readAsText(file);
    this.fileName = file.name;
  }

  onReaderLoad(event): void {
    this.importQuery = JSON.parse(event.target.result);
  }
}
