import { MockBackendDataProvider } from './MockBackendDataProvider'

describe('MockBackendDataProvider', () => {
  const provider = new MockBackendDataProvider()

  it('getCategories', () => {
    expect(provider.getCategoryEntries().length).toBe(7)
  })

  it('getTerminologyEntry (amnesis)', () => {
    const terminologyEntry = provider.getTerminologyEntry('1')
    expect(terminologyEntry.children.length).toBe(3)
    // non-leaf without delivered children
    expect(terminologyEntry.children[2].id).toBe('A3')
    expect(terminologyEntry.children[2].leaf).toBe(false)
    expect(terminologyEntry.children[2].children).toEqual([])
  })

  it('getTerminologyEntry (amnesis liver)', () => {
    const terminologyEntry = provider.getTerminologyEntry('A3')
    expect(terminologyEntry.children.length).toBe(5)
    expect(terminologyEntry.children[0].id).toBe('A3_1')
  })

  it('getTerminologyEntry (demographics)', () => {
    const terminologyEntry = provider.getTerminologyEntry('2')
    expect(terminologyEntry.children.length).toBe(6)
    expect(terminologyEntry.children[0].id).toBe('D1')
  })

  it('getTerminologyEntry (other)', () => {
    const terminologyEntry = provider.getTerminologyEntry('6')
    expect(terminologyEntry.children.length).toBe(0)
    expect(terminologyEntry.termCode.code).toBe('xyz')
    expect(terminologyEntry.id).toBe('6')
  })

  it('getTerminologyEntry (non specified id)', () => {
    const terminologyEntry = provider.getTerminologyEntry('XYZ')
    expect(terminologyEntry.children.length).toBe(0)
  })

  it('getTerminolgyEntrySearchResult (all)', () => {
    const terminologyEntryList = provider.getTerminolgyEntrySearchResult('', 'B')
    expect(terminologyEntryList.length).toBe(34)
    expect(terminologyEntryList[0].termCode.code).toBe('B18.9')
    expect(terminologyEntryList[0].termCode.display).toBe(
      'Chronische Virushepatitis, nicht näher bezeichnet'
    )
    expect(terminologyEntryList[0].display).toBe(
      'Chronische Virushepatitis, nicht näher bezeichnet'
    )
    expect(terminologyEntryList[31].termCode.code).toBe('76689-9')
    expect(terminologyEntryList[31].termCode.display).toBe('Biological Sex')
    expect(terminologyEntryList[31].display).toBe('Biological Sex')
  })

  it('getTerminolgyEntrySearchResult (amnesis)', () => {
    const terminologyEntryList = provider.getTerminolgyEntrySearchResult('1', 'B')
    expect(terminologyEntryList.length).toBe(31)
    expect(terminologyEntryList[0].termCode.code).toBe('B18.9')
    expect(terminologyEntryList[0].termCode.display).toBe(
      'Chronische Virushepatitis, nicht näher bezeichnet'
    )
    expect(terminologyEntryList[0].display).toBe(
      'Chronische Virushepatitis, nicht näher bezeichnet'
    )
  })

  it('getTerminolgyEntrySearchResult (demographics)', () => {
    const terminologyEntryList = provider.getTerminolgyEntrySearchResult('2', 'B')
    expect(terminologyEntryList.length).toBe(3)
    expect(terminologyEntryList[0].termCode.code).toBe('76689-9')
    expect(terminologyEntryList[0].termCode.display).toBe('Biological Sex')
    expect(terminologyEntryList[0].display).toBe('Biological Sex')
  })
})
