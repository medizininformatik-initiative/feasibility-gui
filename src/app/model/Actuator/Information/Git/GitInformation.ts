import { GitInformationData } from 'src/app/model/Interface/ActuatorInfoData/GitData/GitInformationData';
import { GitBranchInformation } from './GitBranchInformation';
import { GitBuildInformation } from './GitBuildInformation';
import { GitCommitInformation } from './GitCommitInformation';

export class GitInformation {
  private buildInformation: GitBuildInformation;
  private branchInformation: GitBranchInformation;
  private commitInformation: GitCommitInformation;

  constructor(
    buildInformation: GitBuildInformation,
    branchInformation: GitBranchInformation,
    commitInformation: GitCommitInformation
  ) {
    this.buildInformation = buildInformation;
    this.branchInformation = branchInformation;
    this.commitInformation = commitInformation;
  }

  public getBuildInformation(): GitBuildInformation {
    return this.buildInformation;
  }

  public setBuildInformation(buildInformation: GitBuildInformation): void {
    this.buildInformation = buildInformation;
  }

  public getBranchInformation(): GitBranchInformation {
    return this.branchInformation;
  }

  public setBranchInformation(branchInformation: GitBranchInformation): void {
    this.branchInformation = branchInformation;
  }

  public getCommitInformation(): GitCommitInformation {
    return this.commitInformation;
  }

  public setCommitInformation(commitInformation: GitCommitInformation): void {
    this.commitInformation = commitInformation;
  }

  public static fromJson(json: GitInformationData): GitInformation {
    return new GitInformation(
      GitBuildInformation.fromJson(json.build),
      GitBranchInformation.fromJson(json.branch),
      GitCommitInformation.fromJson(json.commit)
    );
  }
}
