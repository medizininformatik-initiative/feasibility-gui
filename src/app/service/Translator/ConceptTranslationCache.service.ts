import { ConceptData } from 'src/app/model/Interface/ConceptData';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConceptTranslationCacheService {
  private conceptTranslationCache = new Map<string, Display>();

  constructor() {}

  public getConceptDisplayByHash(id: string): Display | undefined {
    return this.conceptTranslationCache.get(id);
  }

  /**
   * @param id
   * @param display
   */
  public setConceptDisplayByHash(id: string, display: Display): void {
    this.conceptTranslationCache.set(id, display);
  }

  /**
   *
   * @param conceptsData
   * @returns
   */
  public setConceptsByHash(conceptsData: ConceptData[]): void {
    conceptsData.map((conceptData: ConceptData) => {
      const display = Display.fromJson(conceptData.display);
      this.setConceptDisplayByHash(conceptData.id, display);
    });
  }
}
