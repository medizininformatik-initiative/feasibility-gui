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
    const contextVersion = context.version ? context.version : '';
    const termcodeVersion = termCode.version ? termCode.version : '';
    const hashCode =
      context.system +
      context.code +
      contextVersion +
      termCode.system +
      termCode.code +
      termcodeVersion;
    return uuidv3(hashCode, BackendService.BACKEND_UUID_NAMESPACE);
  }
}
