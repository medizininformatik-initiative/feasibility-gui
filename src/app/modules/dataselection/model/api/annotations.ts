export const transient = (): any => (target: any, key: string | symbol) => {
  // 'Only relevant for UI (not part of REST-API)'
};

export const V2 = (): any => (target: any, key: string | symbol) => {
  // 'Only relevant for version 2'
};
