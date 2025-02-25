/* eslint-disable */
import * as htmlToImage from 'html-to-image' // eslint-disable-line
import { Component, Input, OnInit } from '@angular/core'
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion'
import { FileSaverService } from 'ngx-filesaver'
import { Subscription } from 'rxjs'
import { toBlob, toJpeg, toPixelData, toPng, toSvg } from 'html-to-image'

@Component({
  selector: 'num-display-feasibility-query',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayFeasibilityQueryComponent implements OnInit {
  droppedItems: Criterion[] = []
  groupType: 'Inclusion' | 'Exclusion'
  querySubscription: Subscription

  @Input() isEditable: boolean

  constructor(private fileSaverService: FileSaverService) {} // Inject FileSaverService

  ngOnInit() {}

  render(): void {
    const node = document.getElementById('rendertest')
    const fontCss = document.createElement('style')
    const fontCssRule = `
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        backgroundColor: white;
        color: white;
        
    }`
    fontCss.appendChild(document.createTextNode(fontCssRule))
    document.head.appendChild(fontCss)

    // Convert the node to a PNG Blob
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
