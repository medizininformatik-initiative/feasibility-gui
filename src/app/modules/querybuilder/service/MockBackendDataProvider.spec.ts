import { MockBackendDataProvider } from './MockBackendDataProvider'

describe('MockBackendDataProvider', () => {
  it('getCategories', () => {
    expect(MockBackendDataProvider.getCategoryEntries().length).toBe(6)
  })

  it('getTerminologyEntry (amnesis)', () => {
    const terminologyEntry = MockBackendDataProvider.getTerminologyEntry('1')
    expect(terminologyEntry.children.length).toBe(3)
    // non-leaf without delivered children
    expect(terminologyEntry.children[2].id).toBe('A3')
    expect(terminologyEntry.children[2].leaf).toBe(false)
    expect(terminologyEntry.children[2].children).toEqual([])
  })

  it('getTerminologyEntry (amnesis liver)', () => {
    const terminologyEntry = MockBackendDataProvider.getTerminologyEntry('A3')
    expect(terminologyEntry.children.length).toBe(5)
    expect(terminologyEntry.children[0].id).toBe('A3_1')
  })

  it('getTerminologyEntry (demographics)', () => {
    const terminologyEntry = MockBackendDataProvider.getTerminologyEntry('2')
    expect(terminologyEntry.children.length).toBe(6)
    expect(terminologyEntry.children[0].id).toBe('D1')
  })

  it('getTerminologyEntry (non specified id)', () => {
    const terminologyEntry = MockBackendDataProvider.getTerminologyEntry('XYZ')
    expect(terminologyEntry.children.length).toBe(0)
  })
})
