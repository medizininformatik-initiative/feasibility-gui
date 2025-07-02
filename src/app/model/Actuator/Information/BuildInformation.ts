import { BuildDetailsData } from '../../Interface/ActuatorInfoIData/BuildData/BuildDetailsData';
import { BuildInformationData } from '../../Interface/ActuatorInfoIData/BuildInformationData';
import { BuildDetails } from './Build/BuildInformation';
import { GitInformation } from './Git/GitInformation';
import { TerminologyInformation } from './Terminology/TerminologyInformation';

export class BuildInformation {
  private gitInformation: GitInformation;
  private buildInformation: BuildDetails;
  private terminologyInformation: TerminologyInformation;

  constructor(
    gitInformation: GitInformation,
    buildInformation: BuildDetails,
    terminologyInformation: TerminologyInformation
  ) {
    this.gitInformation = gitInformation;
    this.buildInformation = buildInformation;
    this.terminologyInformation = terminologyInformation;
  }

  public getGitInformation(): GitInformation {
    return this.gitInformation;
  }

  public setGitInformation(gitInformation: GitInformation): void {
    this.gitInformation = gitInformation;
  }

  public getBuildInformation(): BuildDetails {
    return this.buildInformation;
  }

  public setBuildInformation(buildInformation: BuildDetails): void {
    this.buildInformation = buildInformation;
  }

  public getTerminalInformation(): TerminologyInformation {
    return this.terminologyInformation;
  }

  public setTerminalInformation(terminalInformation: TerminologyInformation): void {
    this.terminologyInformation = terminalInformation;
  }

  public static fromJson(json: BuildInformationData): BuildInformation {
    return new BuildInformation(
      GitInformation.fromJson(json.git),
      BuildDetails.fromJson(json.build),
      TerminologyInformation.fromJson(json.terminology)
    );
  }
}
