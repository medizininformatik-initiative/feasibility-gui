import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/app/shared/service/Snackbar/Snackbar.service';

@Injectable({
  providedIn: 'root',
})
export abstract class FileUploadService {
  constructor(private snackbarService: SnackbarService) {}

  public readFile(file: File, onLoadCallback: (result: string | ArrayBuffer | null) => void): void {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const result = event.target?.result;
        onLoadCallback(result);
      } catch (error) {
        console.error('Error reading the file:', error);
      }
    };
    reader.readAsText(file);
  }
}
