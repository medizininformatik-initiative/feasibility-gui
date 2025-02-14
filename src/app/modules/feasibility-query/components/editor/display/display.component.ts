import { Component, Input, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { Subscription } from 'rxjs';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
@Component({
  selector: 'num-display-feasibility-query',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayFeasibilityQueryComponent implements OnInit {
  droppedItems: Criterion[] = [];
  groupType: 'Inclusion' | 'Exclusion';
  querySubscription: Subscription;

  @Input() isEditable: boolean;

  constructor() {}

  ngOnInit() {}

  render(): void {
    const node = document.getElementById('rendertest');
    const fontCss = document.createElement('style');
    const fontCssRule = `
  @font-face {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      src: local('Roboto Medium'), local('Roboto-Medium'),
        url('/assets/font/roboto-medium-500.woff2') format('woff2'),
        url('/assets/font/roboto-medium-500.woff') format('woff'),
        url('/assets/font/roboto-medium-500.ttf') format('truetype');
    }`;
    fontCss.appendChild(document.createTextNode(fontCssRule));
    document.head.appendChild(fontCss);

    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }
}
