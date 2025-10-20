import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConceptTranslationCacheService {
  private conceptTranslationCache = new Map<string, Display>();

  constructor() {}

  public getConceptDisplayById(id: string): Display | undefined {
    return this.conceptTranslationCache.get(id);
  }

  public setConceptDisplayById(id: string, translation: Display): void {
    this.conceptTranslationCache.set(id, translation);
  }
}
