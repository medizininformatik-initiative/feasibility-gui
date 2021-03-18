import { ObjectHelper } from './ObjectHelper'

describe('ObjectHelper', () => {
  const objA = { a: 1 }
  const objAAgain = { a: 1 }

  const objB = { a: 2 }

  it('should result in equal but not identical object', () => {
    expect(ObjectHelper.clone(objA)).not.toBe(objA)
    expect(ObjectHelper.clone(objA)).toEqual(objA)
  })

  it('should not result in equal object', () => {
    expect(ObjectHelper.clone(objA)).not.toBe(objB)
    expect(ObjectHelper.clone(objA)).not.toEqual(objB)
  })

  it('should result in identical falsy value', () => {
    expect(ObjectHelper.clone(undefined)).toBe(undefined)
    expect(ObjectHelper.clone(null)).toBe(null)
    expect(ObjectHelper.clone(0)).toBe(0)
    expect(ObjectHelper.clone('')).toBe('')
  })

  it('should result in equality', () => {
    expect(objA).not.toBe(objAAgain)
    expect(ObjectHelper.equals(objA, objAAgain)).toBe(true)
  })

  it('should not result in inequality', () => {
    expect(ObjectHelper.equals(objA, objB)).toBe(false)
  })

  it('should not result in inequality (empty first parameter)', () => {
    expect(ObjectHelper.equals(objA, null)).toBe(false)
  })

  it('should not result in inequality (empty second parameter)', () => {
    expect(ObjectHelper.equals(null, objB)).toBe(false)
  })

  it('should be a valid number', () => {
    expect(ObjectHelper.isNumber(1)).toBe(true)
  })

  it('should be a valid number (zero)', () => {
    expect(ObjectHelper.isNumber(0)).toBe(true)
  })

  it('should not be a valid number (null)', () => {
    expect(ObjectHelper.isNumber(null)).toBe(false)
  })

  it('should not be a valid number (undefined)', () => {
    expect(ObjectHelper.isNumber(undefined)).toBe(false)
  })
})
