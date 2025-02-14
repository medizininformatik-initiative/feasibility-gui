import { Injectable } from '@angular/core';
import { TerminologyCode } from '../../model/Terminology/TerminologyCode';
import { v3 as uuidv3 } from 'uuid';
import { UuidPaths } from '../Backend/Paths/UuidPaths';

@Injectable({
  providedIn: 'root',
})
export class CriterionHashService {
  constructor() {}

  public createHash(context: TerminologyCode, termCode: TerminologyCode): string {
    const contextSystem = context?.getSystem() || '';
    const contextCode = context?.getCode() || '';
    const contextVersion = context?.getVersion() || '';

    const hashCode = `${contextSystem}${contextCode}${contextVersion}${termCode.getSystem()}${termCode.getCode()}`;

    return uuidv3(hashCode, UuidPaths.UUID_NAMESPACE);
  }
}
