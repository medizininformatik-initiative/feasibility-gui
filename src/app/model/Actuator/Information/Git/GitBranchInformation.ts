import { GitBranchData } from 'src/app/model/Interface/ActuatorInfoIData/GitData/GitBranchData';

export class GitBranchInformation {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public static fromJson(json: GitBranchData): GitBranchInformation {
    return new GitBranchInformation(json.name);
  }
}
