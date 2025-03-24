/*
   eslint-disable
   */
import * as htmlToImage from 'html-to-image'
import { FileSaverService } from 'ngx-filesaver'
import { Injectable } from '@angular/core'
import { jsPDF } from 'jspdf'
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
  public toPdf(node: HTMLElement): void {
    htmlToImage.toCanvas(node).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'cm', 'a4')
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 20, 20)
      pdf.save('Filename.pdf')
    })
    /*htmlToImage.toPng(node).then((png) => {
      let pdf = new jsPDF('l', 'cm', 'a4');
      pdf.addImage(png, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('Filename.pdf');
    })*/
  }
}
