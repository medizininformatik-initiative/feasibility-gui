import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'num-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.scss'],
})
export class StatusDisplayComponent implements OnInit, OnDestroy {
  currentStatus = '';
  isLoading = true; // Assume loading starts as true
  private subscription: Subscription;

  constructor(private statusService: StatusService) {}

  ngOnInit() {
    this.subscription = this.statusService.pollStatus().subscribe({
      next: (response) => {
        this.currentStatus = response.current_status;
      },
      error: (error) => {
        console.error('Error polling status:', error);
        this.currentStatus = 'Error fetching status.';
      },
    });
  }

  ngOnDestroy() {
    // Ensure we clean up when the component is destroyed to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
