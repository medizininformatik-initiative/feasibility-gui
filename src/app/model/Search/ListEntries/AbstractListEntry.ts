export abstract class AbstractListEntry {
  protected readonly id: string;
  /**
   * @param id
   */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Returns the ID of the list entry.
   * @returns The ID of the list entry.
   */
  public getId(): string {
    return this.id;
  }
}
