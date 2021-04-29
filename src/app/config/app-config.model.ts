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
  }
  legal: {
    version: string
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
    }
  }
  options: {
    pollingtimeinseconds: number
    pollingintervallinseconds: number
  }
  mock: {
    terminology: boolean
    query: boolean
    result: boolean
  }
  stylesheet: string
}
