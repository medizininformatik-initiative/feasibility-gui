export class ObjectHelper {
  public static clone<T>(object: T): T {
    if (!object) {
      return object
    }

    return JSON.parse(JSON.stringify(object))
  }

  public static equals(object1: any, object2: any): boolean {
    if (!object1 || !object2) {
      return false
    }

    return JSON.stringify(object1) === JSON.stringify(object2)
  }
}
