export interface IUserProfile {
  info: {
    name: string
    realm_access: {
      roles: string[]
    }
  }
}
