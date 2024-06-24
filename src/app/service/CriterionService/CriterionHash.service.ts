import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { TerminologyCode } from '../../model/Terminology/TerminologyCode';
import { v3 as uuidv3 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CriterionHashService {
  constructor() {}

  public createHash(context: TerminologyCode, termCode: TerminologyCode): string {
    let contextVersion = '';
    let contextSystem = '';
    let contextCode = '';
    let termcodeVersion = '';

    if (context) {
      contextSystem = context.getSystem();
      contextCode = context.getCode();
      if (context.getVersion()) {
        contextVersion = context.getVersion();
      }
    }

    if (termCode.getVersion()) {
      termcodeVersion = termCode.getVersion();
    }

    const hashCode =
      contextSystem +
      contextCode +
      contextVersion +
      termCode.getSystem() +
      termCode.getCode() +
      termcodeVersion;

    return uuidv3(hashCode, BackendService.BACKEND_UUID_NAMESPACE);
  }
}
