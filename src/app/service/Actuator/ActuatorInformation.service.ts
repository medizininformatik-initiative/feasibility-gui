import { ActuatorApiService } from '../Backend/Api/ActuatorApi.service';
import { BuildDetails } from 'src/app/model/Actuator/Information/Build/BuildInformation';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BuildInformation } from 'src/app/model/Actuator/Information/BuildInformation';

@Injectable({
  providedIn: 'root',
})
export class ActuatorInformationService {
  constructor(private actuator: ActuatorApiService) {}

  public getActuatorInformation() {
    return this.actuator.getActuatorHealth().pipe(
      map((data) => {
        console.log(data);
        console.log(BuildInformation.fromJson(data));
        return BuildInformation.fromJson(data);
      })
    );
  }
}
