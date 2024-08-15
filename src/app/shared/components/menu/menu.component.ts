import { Component, Input, OnInit } from '@angular/core';
import { MenuItemInterface } from 'src/app/service/MenuService/MenuItemInterface';

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
