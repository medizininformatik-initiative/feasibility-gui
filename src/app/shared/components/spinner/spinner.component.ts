import { Component, Input, OnInit } from '@angular/core';
import {FeatureService} from "../../../service/Feature.service";
import {FeatureProviderService} from "../../../modules/querybuilder/service/feature-provider.service";

@Component({
  selector: 'num-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input()
  countdown: number;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const interval = setInterval(() => {

      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.countdown = 0;
      }
    }, 1000);
  }
}
