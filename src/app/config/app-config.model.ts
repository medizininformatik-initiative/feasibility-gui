export interface IAppConfig {
  env: {
    name: string
  }
  api: {
    baseUrl: string
  }
  uiBackendApi: {
    baseUrl: string
  }
  auth: {
    baseUrl: string
    realm: string
    clientId: string
    roles: string[]
  }
  legal: {
    version: string
    copyrightYear: string
    copyrightOwner: string
  }
  features: {
    v2: {
      multiplevaluedefinitions: boolean
      multiplegroups: boolean
      dependentgroups: boolean
      timerestriction: boolean
    }
    extra: {
      displayvaluefiltericon: boolean
      showoptionspage: boolean
      optionpageroles: string[]
      displayInfoMessage: boolean
    }
  }
  options: {
    sendsqcontexttobackend: boolean
    pollingtimeinseconds: number
    pollingintervallinseconds: number
    lowerboundarypatientresult: number
    lowerboundarylocationresult: number
  }
  mock: {
    terminology: boolean
    query: boolean
    result: boolean
    loadnsave: boolean
  }
  stylesheet: string
  fhirport: string
  dataset: string
  queryVersion: string
}
