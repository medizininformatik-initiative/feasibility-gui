/*
   eslint-disable 
   */
import * as htmlToImage from 'html-to-image'
import { FileSaverService } from 'ngx-filesaver'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class HtmlToImageService {
  constructor(private fileSaverService: FileSaverService) {}

  /**
   * @param node
   * @returns
   */
  public toBlob(node: HTMLElement): void {
    htmlToImage
      .toBlob(node)
      .then((blob) => {
        this.fileSaverService.save(blob, 'image.png')
      })
      .catch((error) => {
        console.error('Oops, something went wrong!', error)
      })
  }
}
