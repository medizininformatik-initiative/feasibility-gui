import { ActuatorInformationService } from 'src/app/service/Actuator/ActuatorInformation.service';
import { BuildInformation } from 'src/app/model/Actuator/Information/BuildInformation';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsProviderService } from 'src/app/service/Config/AppSettingsProvider.service';

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
  legalEmail: string;
  backendBuildTime: string;

  constructor(
    private actuatorInformationService: ActuatorInformationService,
    private appSettingsProviderService: AppSettingsProviderService
  ) {}

  ngOnInit() {
    this.getActuatorInfo();
  }

  public getActuatorInfo() {
    this.actuatorInformationService.getActuatorInformation().subscribe((info) => {
      this.text = info;
      this.backendBuildTime = new Date(info.git?.build?.time).toLocaleString();
    });
    this.legalVersion = this.appSettingsProviderService.getVersion();
    this.legalCopyrightOwner = this.appSettingsProviderService.getCopyrightOwner();
    this.legalCopyrightYear = this.appSettingsProviderService.getCopyrightYear();
    this.legalEmail = this.appSettingsProviderService.getEmail();
  }
}
