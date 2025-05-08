import { DisplayData } from 'src/app/model/Interface/DisplayData';
import { Display } from '../../Display';

export class ReferencedProfile {
  private readonly url: string;
  private readonly display: Display;
  private readonly fields: Display;

  constructor(url: string, display: Display, fields: Display) {
    this.url = url;
    this.display = display;
    this.fields = fields;
  }
  public getUrl(): string {
    return this.url;
  }

  public getDisplay(): Display {
    return this.display;
  }

  public getFields(): Display {
    return this.fields;
  }
}
