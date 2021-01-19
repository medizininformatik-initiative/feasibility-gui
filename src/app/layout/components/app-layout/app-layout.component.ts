import { Component, OnInit, ViewChild } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav
  isHandset: boolean
  isSideMenuExpanded = true

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((state) => {
      this.isHandset = !!state.matches
    })
  }

  toggleMenu($event): void {
    // On Desktop version do not minimize side menu when choosing item
    if (this.isHandset || !$event?.item) {
      this.isSideMenuExpanded = !this.isSideMenuExpanded
    }
  }
}
