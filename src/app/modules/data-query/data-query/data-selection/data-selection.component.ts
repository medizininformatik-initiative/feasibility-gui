import { Component, OnInit, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { DataSelection } from 'src/app/model/DataSelection/DataSelection';
import { DataSelectionProviderService } from 'src/app/modules/data-selection/services/DataSelectionProvider.service';
import { NavigationHelperService } from 'src/app/service/NavigationHelper.service';
import { CRTDL2UIModelService } from 'src/app/service/Translator/CRTDL/CRTDL2UIModel.service';
import { DataExtraction2UiDataSelectionService } from 'src/app/service/Translator/DataExtraction/DataExtraction2UiDataSelection.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit {
  @Input() showActionBar;
  @Output() scrollClick = new EventEmitter();
  isDataSelectionExistent = false;

  fileName: string;
  constructor(
    public elementRef: ElementRef,
    private dataSelectionProviderService: DataSelectionProviderService,
    private navigationHelperService: NavigationHelperService,
    private crdtlTranslatorService: CRTDL2UIModelService,
    private dataExtraction2UiDataSelectionService: DataExtraction2UiDataSelectionService
  ) {}

  ngOnInit(): void {
    this.dataSelectionProviderService.getActiveDataSelection().subscribe((dataSelection) => {
      if (dataSelection.getProfiles().length > 0) {
        this.isDataSelectionExistent = true;
      } else {
        this.isDataSelectionExistent = false;
      }
    });
  }

  public editDataSelection() {
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public createNewDataSelection() {
    const dataSelection = new DataSelection([], uuidv4());
    this.dataSelectionProviderService.setDataSelectionByUID(
      dataSelection.getId(),
      dataSelection,
      true
    );
    this.navigationHelperService.navigateToDataSelectionEditor();
  }

  public downloadDataSelection() {}

  public onFileSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = this.onReaderLoad.bind(this);
      reader.readAsText(file);
    }
  }

  public uploadDataSelection(crtdl: string) {
    this.crdtlTranslatorService.translateToUiModel(crtdl);
  }

  public onReaderLoad(event: ProgressEvent<FileReader>): void {
    try {
      const importedQuery = JSON.parse(event.target?.result as string);
      this.uploadDataSelection(importedQuery);
    } catch (error) {
      console.error('Error parsing the file:', error);
    }
  }

  scroll() {
    this.showActionBar = false;
    this.scrollClick.emit(true);
  }
}
