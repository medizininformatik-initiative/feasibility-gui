import { GitCommitIdData } from 'src/app/model/Interface/ActuatorInfoIData/GitData/GitCommitIdData';

export class GitCommitIdInformation {
  private full: string;
  private abbrev: string;
  constructor(full: string, abbrev: string) {
    this.full = full;
    this.abbrev = abbrev;
  }

  public getFull(): string {
    return this.full;
  }

  public setFull(full: string): void {
    this.full = full;
  }

  public getAbbrev(): string {
    return this.abbrev;
  }

  public setAbbrev(abbrev: string): void {
    this.abbrev = abbrev;
  }

  public static fromJson(json: GitCommitIdData): GitCommitIdInformation {
    return new GitCommitIdInformation(json.full, json.abbrev);
  }
}
