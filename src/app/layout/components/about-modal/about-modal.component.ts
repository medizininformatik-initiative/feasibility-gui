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
  legalVersion: string;
  legalCopyrightOwner: string;
  legalCopyrightYear: string;
  backendBuildTime: string;

  constructor(
    private actuatorInformationService: ActuatorInformationService,
    private featureService: FeatureService
  ) {}

  ngOnInit() {
    this.getActuatorInfo();
  }

  public getActuatorInfo() {
    this.actuatorInformationService.getActuatorInformation().subscribe((info) => {
      this.text = info;
      console.log(this.text);
      this.backendBuildTime = new Date(info.git?.build?.time).toLocaleString();
    });
    this.legalVersion = this.featureService.getLegalVersion();
    this.legalCopyrightOwner = this.featureService.getLegalCopyrightOwner();
    this.legalCopyrightYear = this.featureService.getLegalCopyrightYear();
  }
}
