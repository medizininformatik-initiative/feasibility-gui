import { GitCommitData } from 'src/app/model/Interface/ActuatorInfoData/GitData/GitCommitData';
import { GitCommitIdInformation } from './GitCommitIdInformation';

export class GitCommitInformation {
  private id: GitCommitIdInformation;

  constructor(id: GitCommitIdInformation) {
    this.id = id;
  }

  public getCommitId(): GitCommitIdInformation {
    return this.id;
  }

  public setCommitId(id: GitCommitIdInformation): void {
    this.id = id;
  }

  public static fromJson(json: GitCommitData): GitCommitInformation {
    return new GitCommitInformation(GitCommitIdInformation.fromJson(json.id));
  }
}
