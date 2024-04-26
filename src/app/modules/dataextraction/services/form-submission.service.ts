import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  private apiUrl = 'https://pathling-staging:8000/run_ccdl'; // Update with your actual endpoint URL

  constructor(private http: HttpClient) {}

  submitForm(data: any) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
