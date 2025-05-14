import { Injectable } from '@angular/core';
import { TerminologyApiService } from '../../Backend/Api/TerminologyApi.service';
import { TerminologyCodeData } from 'src/app/model/Interface/TerminologyCodeData';

@Injectable({
  providedIn: 'root',
})
export class CodeableConceptTranslatorService {
  constructor(private terminologyApiService: TerminologyApiService) {}

  public translate(terminologyCodes: TerminologyCodeData) {}
}
