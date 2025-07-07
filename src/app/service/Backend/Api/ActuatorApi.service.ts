import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from '../Backend.service';
import { ActuatorPaths } from '../Paths/ActuatorPath';
import { Observable } from 'rxjs';
import { BuildInformationData } from 'src/app/model/Interface/ActuatorInfoIData/BuildInformationData';

@Injectable({
  providedIn: 'root',
})
export class ActuatorApiService {
  constructor(private http: HttpClient, private backendService: BackendService) {}

  public getActuatorInfo(): Observable<any> {
    return this.http.get<any>(this.backendService.createUrl(ActuatorPaths.INFO_ENDPOINT), {
      headers: this.backendService.getHeaders(),
    });
  }

  public getActuatorHealth(): Observable<BuildInformationData> {
    return this.http.get<any>(this.backendService.createUrl(ActuatorPaths.HEALTH_ENDPOINT), {
      headers: this.backendService.getHeaders(),
    });
  }
}
