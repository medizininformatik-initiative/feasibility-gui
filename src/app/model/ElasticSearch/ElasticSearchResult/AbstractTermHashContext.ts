abstract class AbstractTermHashContext {
  name: string;
  contextualizedTermcodeHash?: string;

  getName(): string | undefined {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getContextualizedTermcodeHash(): string | undefined {
    return this.contextualizedTermcodeHash;
  }

  setContextualizedTermcodeHash(contextualizedTermcodeHash: string | undefined): void {
    this.contextualizedTermcodeHash = contextualizedTermcodeHash;
  }
}
