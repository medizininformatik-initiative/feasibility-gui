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
    return this.actuator.getActuatorInfo().pipe(
      map((data) => {
        console.log(data);
        return data; // BuildInformation.fromJson(data);
      })
    );
  }
}
