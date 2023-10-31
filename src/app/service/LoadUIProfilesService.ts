import { Injectable } from '@angular/core';
import { Criterion } from '../model/query/Criterion/criterion';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Observable, Subscription, from, map } from 'rxjs';
import { AttributeDefinition } from '../modules/querybuilder/model/api/terminology/valuedefinition';
import { AttributeDefinitions } from '../model/terminology/attributeDefinitions';

@Injectable({
  providedIn: 'root',
})
export class LoadUIProfilesService {
  private criterion: Criterion;
  private backend: BackendService;
  private profile: any;
  constructor() {}

  public getUIProfiles(criterion: Criterion): Observable<string> {
    this.criterion = criterion;
    const profilesObservable = this.loadUIProfiles();
    return profilesObservable;
  }

  private loadUIProfiles() {
    this.profile = this.backend.getTerminologyProfile(this.criterion);
  }

  getProfileAttributes(): AttributeDefinitions {
    return this.profile.attributeDefinitions;
  }
}
