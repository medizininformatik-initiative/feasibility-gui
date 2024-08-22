import { Component, Input, OnInit } from '@angular/core';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';

@Component({
  selector: 'num-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input()
  id: string;

  @Input()
  menuItems: MenuItemInterface[] = [];

  constructor() {}

  ngOnInit() {}
}
