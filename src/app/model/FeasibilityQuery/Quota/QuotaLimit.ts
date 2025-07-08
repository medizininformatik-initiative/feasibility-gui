export class QuotaLimit {
  private readonly interval: 'PW1' | 'PT1M';
  private readonly total: number;
  private readonly used: number;

  constructor(interval: 'PW1' | 'PT1M', total: number, used: number) {
    this.interval = interval;
    this.total = total;
    this.used = used;
  }

  public getRemaining(): number {
    return this.total - this.used;
  }

  public getInterval(): 'PW1' | 'PT1M' {
    return this.interval;
  }

  public getTotal(): number {
    return this.total;
  }

  public getUsed(): number {
    return this.used;
  }
}
