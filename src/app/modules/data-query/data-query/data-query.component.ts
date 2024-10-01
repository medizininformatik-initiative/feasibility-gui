import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'num-data-query',
  templateUrl: './data-query.component.html',
  styleUrls: ['./data-query.component.scss'],
})
export class DataQueryComponent {
  constructor(private router: Router) {}

  sendQuery() {
    this.router.navigate(['/querybuilder/result'], { state: { preventReset: true } });
  }
}
