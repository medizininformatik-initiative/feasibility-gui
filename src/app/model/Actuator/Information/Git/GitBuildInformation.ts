import { GitBuildData } from '../../../Interface/ActuatorInfoData/GitData/GitBuildData';

export class GitBuildInformation {
  private version: string;
  private time: string;

  constructor(version: string, time: string) {
    this.version = version;
    this.time = time;
  }

  public getVersion(): string {
    return this.version;
  }

  public setVersion(version: string): void {
    this.version = version;
  }

  public getTime(): string {
    return this.time;
  }

  public setTime(time: string): void {
    this.time = time;
  }

  public static fromJson(json: GitBuildData): GitBuildInformation {
    return new GitBuildInformation(json.version, json.time);
  }
}
