import { TerminologyInformationData } from 'src/app/model/Interface/ActuatorInfoIData/Terminology/TerminologyInformationData';

export class TerminologyInformation {
  private ontologyTag: string;

  constructor(ontologyTag: string) {
    this.ontologyTag = ontologyTag;
  }

  public getOntologyTag(): string {
    return this.ontologyTag;
  }

  public setOntologyTag(ontologyTag: string): void {
    this.ontologyTag = ontologyTag;
  }

  public static fromJson(json: TerminologyInformationData): TerminologyInformation {
    return new TerminologyInformation(json.ontologyTag);
  }
}
