import { DataExtraction } from './DataExtraction';
import { StructuredQuery } from '../../StructuredQuery/StructuredQuery';

export class CRTDL {
  cohortDefinition: StructuredQuery;
  dataExtraction: DataExtraction;
  display: string;
  version: string;

  constructor(
    display: string,
    version: string,
    cohortDefinition: StructuredQuery,
    dataExtraction: DataExtraction
  ) {
    this.display = display;
    this.version = version;
    this.cohortDefinition = cohortDefinition;
    this.dataExtraction = dataExtraction;
  }
}
