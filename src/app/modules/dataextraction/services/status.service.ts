import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

interface StatusResponse {
  current_status: string
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private readonly STATUS_URL = 'https://pathling-staging:8000/status';

  // Polling interval in milliseconds
  private readonly POLLING_INTERVAL = 2000; // Poll every 5 seconds

  constructor(private http: HttpClient) {}

  // Function to start polling the status endpoint
  public pollStatus(): Observable<StatusResponse> {
    return interval(this.POLLING_INTERVAL).pipe(
      switchMap(() => this.http.get<StatusResponse>(this.STATUS_URL))
    );
  }
}
