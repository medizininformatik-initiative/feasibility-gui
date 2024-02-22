import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { Injectable } from '@angular/core';
import { TerminologyCode } from '../../model/terminology/Terminology';
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
      contextSystem = context.system;
      contextCode = context.code;
      if (context.version) {
        contextVersion = context.version;
      }
    }

    if (termCode.version) {
      termcodeVersion = termCode.version;
    }

    const hashCode =
      contextSystem +
      contextCode +
      contextVersion +
      termCode.system +
      termCode.code +
      termcodeVersion;

    return uuidv3(hashCode, BackendService.BACKEND_UUID_NAMESPACE);
  }
}
