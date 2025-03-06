import { BuildDetailsData } from './BuildData/BuildDetailsData';
import { GitInformationData } from './GitData/GitInformationData';
import { TerminologyInformationData } from './Terminology/TerminologyInformationData';

export interface BuildInformationData {
  git: GitInformationData
  build: BuildDetailsData
  terminology: TerminologyInformationData
}
