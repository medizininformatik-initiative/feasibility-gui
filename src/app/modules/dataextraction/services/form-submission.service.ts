import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  private apiUrl = 'http://localhost:5000/run_extraction'; // Update with your actual endpoint URL

  constructor(private http: HttpClient) {}

  submitForm(data: any) {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
