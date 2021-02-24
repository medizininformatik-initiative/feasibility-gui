import { Criterion } from '../model/api/query/criterion'
import { CritGroupArranger } from './CritGroupArranger'
import { Group } from '../model/api/query/group'
import { ObjectHelper } from './ObjectHelper'

describe('CritGroupArranger', () => {
  it('should split inner array', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')
    const criterionC = createCriterion('c')

    const critGroup = [[criterionA, criterionB], [criterionC]]

    const expectedCritGroup = [[criterionA], [criterionB], [criterionC]]

    expect(CritGroupArranger.splitInnerArray(critGroup, 0, 0)).toStrictEqual(expectedCritGroup)
  })

  it('should split inner array at second position', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')
    const criterionC = createCriterion('c')

    const critGroup = [[criterionA, criterionB, criterionC]]

    const expectedCritGroup = [[criterionA, criterionB], [criterionC]]

    expect(CritGroupArranger.splitInnerArray(critGroup, 0, 1)).toStrictEqual(expectedCritGroup)
  })

  it('should join inner array', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')
    const criterionC = createCriterion('c')

    const critGroup = [[criterionA, criterionB], [criterionC]]

    const expectedCritGroup = [[criterionA, criterionB, criterionC]]

    expect(CritGroupArranger.joinInnerArrays(critGroup, 0)).toStrictEqual(expectedCritGroup)
  })

  it('should join second and third inner array', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')
    const criterionC = createCriterion('c')

    const critGroup = [[criterionA], [criterionB], [criterionC]]

    const expectedCritGroup = [[criterionA], [criterionB, criterionC]]

    expect(CritGroupArranger.joinInnerArrays(critGroup, 1)).toStrictEqual(expectedCritGroup)
  })

  it('should add inclusion criterion', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[2] = [
      createCriterion('in-0-20'),
      createCriterion('in-0-21'),
      createCriterion('XY'),
      createCriterion('in-0-22'),
    ]

    const actual = CritGroupArranger.addCriterion(
      groups,
      {
        groupId: '0',
        critType: 'inclusion',
        row: 2,
        column: 2,
      },
      createCriterion('XY')
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should add exclusion criterion', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].exclusionCriteria[2] = [
      createCriterion('ex-0-20'),
      createCriterion('ex-0-21'),
      createCriterion('XY'),
      createCriterion('ex-0-22'),
    ]

    const actual = CritGroupArranger.addCriterion(
      groups,
      {
        groupId: '0',
        critType: 'exclusion',
        row: 2,
        column: 2,
      },
      createCriterion('XY')
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should add inclusion criterion at first position', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[2] = [
      createCriterion('XY'),
      createCriterion('in-0-20'),
      createCriterion('in-0-21'),
      createCriterion('in-0-22'),
    ]

    const actual = CritGroupArranger.addCriterion(
      groups,
      {
        groupId: '0',
        critType: 'inclusion',
        row: 2,
        column: 0,
      },
      createCriterion('XY')
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should add inclusion criterion at last position', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[2] = [
      createCriterion('in-0-20'),
      createCriterion('in-0-21'),
      createCriterion('in-0-22'),
      createCriterion('XY'),
    ]

    const actual = CritGroupArranger.addCriterion(
      groups,
      {
        groupId: '0',
        critType: 'inclusion',
        row: 2,
        column: 3,
      },
      createCriterion('XY')
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should remove inclusion criterion of first group', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[2] = [
      createCriterion('in-0-21'),
      createCriterion('in-0-22'),
    ]

    const actual = CritGroupArranger.removeCriterion(groups, {
      groupId: '0',
      critType: 'inclusion',
      row: 2,
      column: 0,
    })
    expect(actual).toEqual(groupsExpected)
  })

  it('should remove solo inclusion criterion of inner array', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[0].inclusionCriteria[0] = [createCriterion('in-0-00')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria = [
      [createCriterion('in-0-10'), createCriterion('in-0-11'), createCriterion('in-0-12')],
      [createCriterion('in-0-20'), createCriterion('in-0-21'), createCriterion('in-0-22')],
    ]

    const actual = CritGroupArranger.removeCriterion(groups, {
      groupId: '0',
      critType: 'inclusion',
      row: 0,
      column: 0,
    })
    expect(actual).toEqual(groupsExpected)
  })

  it('should remove exclusion criterion of second', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].exclusionCriteria[1] = [
      createCriterion('ex-1-10'),
      createCriterion('ex-1-11'),
    ]

    const actual = CritGroupArranger.removeCriterion(groups, {
      groupId: '1',
      critType: 'exclusion',
      row: 1,
      column: 2,
    })
    expect(actual).toEqual(groupsExpected)
  })

  it('should remove solo exclusion criterion of inner array', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[0].exclusionCriteria[2] = [createCriterion('ex-0-20')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].exclusionCriteria = [
      [createCriterion('ex-0-00'), createCriterion('ex-0-01'), createCriterion('ex-0-02')],
      [createCriterion('ex-0-10'), createCriterion('ex-0-11'), createCriterion('ex-0-12')],
    ]

    const actual = CritGroupArranger.removeCriterion(groups, {
      groupId: '0',
      critType: 'exclusion',
      row: 2,
      column: 0,
    })
    expect(actual).toEqual(groupsExpected)
  })

  it('should not move inclusion criterion to same position', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)

    const actual = CritGroupArranger.moveCriterion(
      groups,
      {
        groupId: '0',
        critType: 'inclusion',
        row: 1,
        column: 1,
      },
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion between groups', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[1] = [
      createCriterion('in-0-10'),
      createCriterion('in-0-12'),
    ]
    groupsExpected[1].inclusionCriteria[1] = [
      createCriterion('in-1-10'),
      createCriterion('in-0-11'),
      createCriterion('in-1-11'),
      createCriterion('in-1-12'),
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '1', critType: 'inclusion', row: 1, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move from exclusion criterion to inclusion', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[1] = [
      createCriterion('in-0-10'),
      createCriterion('ex-0-11'),
      createCriterion('in-0-11'),
      createCriterion('in-0-12'),
    ]
    groupsExpected[0].exclusionCriteria[1] = [
      createCriterion('ex-0-10'),
      createCriterion('ex-0-12'),
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '0', critType: 'exclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move exclusion criterion to higher row index while removing empty row', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[1].exclusionCriteria[1] = [createCriterion('ex-1-11')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].exclusionCriteria = [
      [createCriterion('ex-1-00'), createCriterion('ex-1-01'), createCriterion('ex-1-02')],
      [
        createCriterion('ex-1-20'),
        createCriterion('ex-1-11'),
        createCriterion('ex-1-21'),
        createCriterion('ex-1-22'),
      ],
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '1', critType: 'exclusion', row: 1, column: 0 },
      { groupId: '1', critType: 'exclusion', row: 2, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move exclusion criterion to lower row index while removing empty row', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[1].exclusionCriteria[1] = [createCriterion('ex-1-11')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].exclusionCriteria = [
      [
        createCriterion('ex-1-00'),
        createCriterion('ex-1-11'),
        createCriterion('ex-1-01'),
        createCriterion('ex-1-02'),
      ],
      [createCriterion('ex-1-20'), createCriterion('ex-1-21'), createCriterion('ex-1-22')],
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '1', critType: 'exclusion', row: 1, column: 0 },
      { groupId: '1', critType: 'exclusion', row: 0, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion to higher row index while removing empty row', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[1].inclusionCriteria[1] = [createCriterion('in-1-11')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].inclusionCriteria = [
      [createCriterion('in-1-00'), createCriterion('in-1-01'), createCriterion('in-1-02')],
      [
        createCriterion('in-1-20'),
        createCriterion('in-1-11'),
        createCriterion('in-1-21'),
        createCriterion('in-1-22'),
      ],
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '1', critType: 'inclusion', row: 1, column: 0 },
      { groupId: '1', critType: 'inclusion', row: 2, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion to lower row index while removing empty row', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))
    groups[1].inclusionCriteria[1] = [createCriterion('in-1-11')]

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].inclusionCriteria = [
      [
        createCriterion('in-1-00'),
        createCriterion('in-1-11'),
        createCriterion('in-1-01'),
        createCriterion('in-1-02'),
      ],
      [createCriterion('in-1-20'), createCriterion('in-1-21'), createCriterion('in-1-22')],
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '1', critType: 'inclusion', row: 1, column: 0 },
      { groupId: '1', critType: 'inclusion', row: 0, column: 1 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion in inner array to higher column index', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[1] = [
      createCriterion('in-0-10'),
      createCriterion('in-0-12'),
      createCriterion('in-0-11'),
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: 1, column: 2 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion in inner array to lower column index', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[1] = [
      createCriterion('in-0-11'),
      createCriterion('in-0-10'),
      createCriterion('in-0-12'),
    ]

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: 1, column: 0 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should not change groups when criterion cannot be found (wrong indices,...)', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)

    const actual = CritGroupArranger.moveCriterion(
      groups,
      { groupId: '300', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: 1, column: 0 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move inclusion criterion to end of exclusion criteria', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].inclusionCriteria[1] = [
      createCriterion('in-0-10'),
      createCriterion('in-0-12'),
    ]
    groupsExpected[0].exclusionCriteria.push([createCriterion('in-0-11')])

    const actual = CritGroupArranger.moveCriterionToEndOfGroup(
      groups,
      { groupId: '0', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'exclusion', row: undefined, column: undefined }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move exclusion criterion to end of inclusion criteria', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[0].exclusionCriteria[1] = [
      createCriterion('ex-0-10'),
      createCriterion('ex-0-12'),
    ]
    groupsExpected[0].inclusionCriteria.push([createCriterion('ex-0-11')])

    const actual = CritGroupArranger.moveCriterionToEndOfGroup(
      groups,
      { groupId: '0', critType: 'exclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: undefined, column: undefined }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should move exclusion criterion to end of the same exclusion criteria', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)
    groupsExpected[1].exclusionCriteria[1] = [
      createCriterion('ex-1-10'),
      createCriterion('ex-1-12'),
    ]
    groupsExpected[1].exclusionCriteria.push([createCriterion('ex-1-11')])

    const actual = CritGroupArranger.moveCriterionToEndOfGroup(
      groups,
      { groupId: '1', critType: 'exclusion', row: 1, column: 1 },
      { groupId: '1', critType: 'exclusion', row: undefined, column: undefined }
    )
    expect(actual).toEqual(groupsExpected)
  })

  it('should not change groups when criterion cannot be found (wrong indices,...) while moving to end of a group', () => {
    const groups: Group[] = []
    groups.push(createDefaultGroup('0'))
    groups.push(createDefaultGroup('1'))

    const groupsExpected = ObjectHelper.clone(groups)

    const actual = CritGroupArranger.moveCriterionToEndOfGroup(
      groups,
      { groupId: '300', critType: 'inclusion', row: 1, column: 1 },
      { groupId: '0', critType: 'inclusion', row: 1, column: 0 }
    )
    expect(actual).toEqual(groupsExpected)
  })

  function createCriterion(code: string): Criterion {
    return {
      termCode: { code, display: code, system: code },
      valueFilters: [],
    }
  }

  function createDefaultGroup(id: string): Group {
    const group = new Group()

    group.id = id
    group.inclusionCriteria = createDefaultCriterionArray('in', id)
    group.exclusionCriteria = createDefaultCriterionArray('ex', id)

    return group
  }

  function createDefaultCriterionArray(critType: string, id: string): Criterion[][] {
    const result: Criterion[][] = []

    result[0] = [
      createCriterion(critType + '-' + id + '-00'),
      createCriterion(critType + '-' + id + '-01'),
      createCriterion(critType + '-' + id + '-02'),
    ]
    result[1] = [
      createCriterion(critType + '-' + id + '-10'),
      createCriterion(critType + '-' + id + '-11'),
      createCriterion(critType + '-' + id + '-12'),
    ]
    result[2] = [
      createCriterion(critType + '-' + id + '-20'),
      createCriterion(critType + '-' + id + '-21'),
      createCriterion(critType + '-' + id + '-22'),
    ]

    return result
  }
})
