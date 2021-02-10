export function transient(): any {
  // noinspection JSUnusedLocalSymbols
  return (target: any, key: string | symbol) => {
    // 'Only relevant for UI (not part of REST-API)'
  }
}

export function V2(): any {
  // noinspection JSUnusedLocalSymbols
  return (target: any, key: string | symbol) => {
    // 'Only relevant for version 2'
  }
}
