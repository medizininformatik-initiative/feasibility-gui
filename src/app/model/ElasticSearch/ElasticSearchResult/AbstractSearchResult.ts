abstract class AbstractSearchResult extends AbstractTermHashContext {
  availability: number;
  domain: string;
  terminology: string;
  termcode: string;
  kdsModule: string;

  getAvailability(): number {
    return this.availability;
  }

  setAvailability(availability: number): void {
    this.availability = availability;
  }

  getDomain(): string {
    return this.domain;
  }

  setDomain(domain: string): void {
    this.domain = domain;
  }

  getTerminology(): string {
    return this.terminology;
  }

  setTerminology(terminology: string): void {
    this.terminology = terminology;
  }

  getTermcode(): string {
    return this.termcode;
  }

  setTermcode(termcode: string): void {
    this.termcode = termcode;
  }

  getKdsModule(): string {
    return this.kdsModule;
  }

  setKdsModule(kdsModule: string): void {
    this.kdsModule = kdsModule;
  }
}
