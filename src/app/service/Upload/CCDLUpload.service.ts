import { CRTDLData } from 'src/app/model/Interface/CRTDLData';
import { CRTDL2UIModelService } from '../Translator/CRTDL/CRTDL2UIModel.service';
import { FileUploadService } from './FileUpload.service';
import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';
import { ProfileProviderService } from 'src/app/modules/data-selection/services/ProfileProvider.service';

@Injectable({
  providedIn: 'root',
})
export class CCDLUploadService {
  constructor(
    private crdtlTranslatorService: CRTDL2UIModelService,
    private snackbarService: SnackbarService,
    private profileProviderService: ProfileProviderService,
    private fileUploadService: FileUploadService
  ) {}

  public uploadCCDL(file: File): void {
    if (file) {
      this.fileUploadService.readFile(file, this.onReaderLoad.bind(this));
    }
  }

  public onReaderLoad(result: string | ArrayBuffer | null): void {
    try {
      const importedQuery = JSON.parse(result as string);
      this.uploadDataSelection(importedQuery);
    } catch (error) {
      console.error('Error parsing the file:', error);
    }
  }

  public uploadDataSelection(crtdl: CRTDLData) {
    this.profileProviderService.resetProfileMap();
    const isDataSelectionExistent = this.crdtlTranslatorService.createCRDTLFromJson(crtdl);
    if (!isDataSelectionExistent) {
      this.snackbarService.displayErrorMessageWithNoCode('DATAQUERY.DATASELECTION.ERROR.UPLOAD');
    } else {
      this.snackbarService.displayInfoMessage('DATAQUERY.DATASELECTION.SUCCESS.UPLOAD');
    }
  }
}
