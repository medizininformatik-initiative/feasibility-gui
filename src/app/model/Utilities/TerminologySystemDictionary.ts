export type CodeSystemEntry = {
  url: string
  name: string
};

export class TerminologySystemDictionary {
  private static instance: TerminologySystemDictionary;
  private static urlToNameMap: Map<string, string> = new Map();
  private static nameToUrlMap: Record<string, string> = {};

  private constructor(entries: CodeSystemEntry[]) {
    TerminologySystemDictionary.nameToUrlMap = this.createDictionary(entries);
    TerminologySystemDictionary.urlToNameMap = this.createReverseLookup(
      TerminologySystemDictionary.nameToUrlMap
    );
  }

  public static initialize(entries: CodeSystemEntry[]): void {
    if (!TerminologySystemDictionary.instance) {
      TerminologySystemDictionary.instance = new TerminologySystemDictionary(entries);
    }
  }

  private createDictionary(entries: CodeSystemEntry[]): Record<string, string> {
    return entries.reduce((acc, entry) => {
      const key = entry.name.toUpperCase().replace(/[-\s]/g, '_');
      acc[key] = entry.url;
      return acc;
    }, {} as Record<string, string>);
  }

  private createReverseLookup(dict: Record<string, string>): Map<string, string> {
    const reverseMap = new Map<string, string>();
    Object.entries(dict).forEach(([key, value]) => {
      reverseMap.set(value, key);
    });
    return reverseMap;
  }

  public static getDictionary(): Record<string, string> {
    if (!TerminologySystemDictionary.instance) {
      throw new Error('CodeSystemDictionary is not initialized. Please call initialize() first.');
    }
    return TerminologySystemDictionary.nameToUrlMap;
  }

  public static getNameByUrl(url: string): string | undefined {
    if (!TerminologySystemDictionary.instance) {
      throw new Error('CodeSystemDictionary is not initialized. Please call initialize() first.');
    }
    return TerminologySystemDictionary.urlToNameMap.get(url);
  }
}
