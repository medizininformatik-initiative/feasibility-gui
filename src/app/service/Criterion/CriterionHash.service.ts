import { Injectable } from '@angular/core';
import { TerminologyCode } from '../../model/Terminology/TerminologyCode';
import { v3 as uuidv3 } from 'uuid';
import { BackendService } from 'src/app/modules/feasibility-query/service/backend.service';

@Injectable({
  providedIn: 'root',
})
export class CriterionHashService {
  constructor() {}

  public createHash(context: TerminologyCode, termCode: TerminologyCode): string {
    let contextVersion = '';
    let contextSystem = '';
    let contextCode = '';

    if (context) {
      contextSystem = context.getSystem();
      contextCode = context.getCode();
      if (context.getVersion()) {
        contextVersion = context.getVersion();
      }
    }

    const hashCode =
      contextSystem + contextCode + contextVersion + termCode.getSystem() + termCode.getCode();

    return uuidv3(hashCode, BackendService.BACKEND_UUID_NAMESPACE);
  }
}
