import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildInformation } from 'src/app/model/Actuator/Information/BuildInformation';
import { ActuatorInformationService } from 'src/app/service/Actuator/ActuatorInformation.service';
import { FeatureService } from 'src/app/service/Feature.service';

@Component({
  selector: 'num-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss'],
})
export class AboutModalComponent implements OnInit {
  actuatorInfo$: Observable<any>;
  text: any;
  constructor(
    private actuatorInformationService: ActuatorInformationService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.getActuatorInfo();
  }

  public getActuatorInfo() {
    console.log('bal bla bla');
    this.actuatorInformationService.getActuatorInformation().subscribe((test) => {
      this.text = test;
      console.log(test);
    });
  }
}
