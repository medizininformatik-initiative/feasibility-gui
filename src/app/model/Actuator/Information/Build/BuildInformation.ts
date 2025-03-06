import { BuildDetailsData } from 'src/app/model/Interface/ActuatorInfoIData/BuildData/BuildDetailsData';

export class BuildDetails {
  private artifact: string;
  private name: string;
  private time: string;
  private version: string;
  private group: string;

  constructor(artifact: string, name: string, time: string, version: string, group: string) {
    this.artifact = artifact;
    this.name = name;
    this.time = time;
    this.version = version;
    this.group = group;
  }

  public getArtifact(): string {
    return this.artifact;
  }

  public setArtifact(artifact: string): void {
    this.artifact = artifact;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getTime(): string {
    return this.time;
  }

  public setTime(time: string): void {
    this.time = time;
  }

  public getVersion(): string {
    return this.version;
  }

  public setVersion(version: string): void {
    this.version = version;
  }

  public getGroup(): string {
    return this.group;
  }

  public setGroup(group: string): void {
    this.group = group;
  }

  public static fromJson(json: BuildDetailsData): BuildDetails {
    return new BuildDetails(json.artifact, json.name, json.time, json.version, json.group);
  }
}
