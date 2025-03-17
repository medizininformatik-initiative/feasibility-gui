import { AnnotatedStructuredQuery } from '../AnnotatedStructuredQuery/AnnotatedStructuredQuery';
import { DataExtraction } from '../CRTDL/DataExtraction/DataExtraction';

export class AnnotatedCRTDL {
  private annotatedCohortDefinition: AnnotatedStructuredQuery;
  private dataExtratcion: DataExtraction;

  constructor(annotatedCohortDefinition: AnnotatedStructuredQuery, dataExtratcion: DataExtraction) {
    this.annotatedCohortDefinition = annotatedCohortDefinition;
    this.dataExtratcion = dataExtratcion;
  }

  public getAnnotatedCohortDefinition(): AnnotatedStructuredQuery {
    return this.annotatedCohortDefinition;
  }

  public setAnnotatedCohortDefinition(value: AnnotatedStructuredQuery): void {
    this.annotatedCohortDefinition = value;
  }

  public getDataExtratcion(): DataExtraction {
    return this.dataExtratcion;
  }

  public setDataExtratcion(value: DataExtraction): void {
    this.dataExtratcion = value;
  }

  public static fromJson(
    annotatedStructuredQuery: AnnotatedStructuredQuery,
    dataExtraction: DataExtraction
  ): AnnotatedCRTDL {
    return new AnnotatedCRTDL(annotatedStructuredQuery, dataExtraction);
  }
}
