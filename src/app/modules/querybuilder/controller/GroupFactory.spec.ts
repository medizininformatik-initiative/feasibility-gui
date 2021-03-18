import { GroupFactory } from './GroupFactory'
import { Query } from '../model/api/query/query'
import { Group } from '../model/api/query/group'

describe('GroupFactory', () => {
  it('should find next new id', () => {
    const query = new Query()
    query.groups.push(createGroup(1))
    query.groups.push(createGroup(2))

    const newGroup = GroupFactory.createGroup(query)

    expect(newGroup.id).toBe(3)
  })

  it('should find missing id', () => {
    const query = new Query()
    query.groups.push(createGroup(1))
    query.groups.push(createGroup(3))

    const newGroup = GroupFactory.createGroup(query)

    expect(newGroup.id).toBe(2)
  })

  it('should find initial id = 1', () => {
    const query = new Query()

    const newGroup = GroupFactory.createGroup(query)

    expect(newGroup.id).toBe(1)
  })

  function createGroup(id: number): Group {
    const group = new Group()
    group.id = id
    return group
  }

  it('should create unlinked DependencyInfo', () => {
    const dependencyInfo = GroupFactory.createGroupDependencyInfo()

    expect(dependencyInfo.linked).toBe(false)
  })
})
