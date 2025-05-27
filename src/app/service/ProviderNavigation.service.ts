import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProviderNavigationService {
  getPreviousElementFromMap<T>(map: Map<string, T>, currentId: string): T | null {
    const keys = Array.from(map.keys());
    const currentIndex = keys.indexOf(currentId);

    if (currentIndex > 0) {
      const previousKey = keys[currentIndex - 1];
      return map.get(previousKey) ?? null;
    }
    return null;
  }

  getNextElementFromMap<T>(map: Map<string, T>, currentId: string): T | null {
    const keys = Array.from(map.keys());
    const currentIndex = keys.indexOf(currentId);

    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      const nextKey = keys[currentIndex + 1];
      return map.get(nextKey) ?? null;
    }

    return null;
  }
}
