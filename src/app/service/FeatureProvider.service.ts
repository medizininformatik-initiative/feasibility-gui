import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeatureProviderService {
  private readonly STORAGE_FEATURE_KEY = 'FEATURES';
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {}

  public setTheme(oldTheme: string, newTheme: string): void {
    this.applyTheme(newTheme, oldTheme);
  }

  private applyTheme(newTheme: string, oldTheme?: string): void {
    if (oldTheme) {
      this.renderer.removeClass(document.body, oldTheme);
      this.toggleLogoClass('header-logo', oldTheme, false);
      this.toggleLogoClass('footer-logo', oldTheme, false);
    }
    if (newTheme) {
      this.renderer.addClass(document.body, newTheme);
      this.toggleLogoClass('header-logo', newTheme, true);
      this.toggleLogoClass('footer-logo', newTheme, true);
    }
    if (newTheme === 'FDPGTheme') {
      this.setLogo('header-logo', 'assets/img/FDPG-Logo.svg', 'FDPG Logo');
      this.setLogo('footer-logo', 'assets/img/Abide_MI_cropped.jpg', 'MII Logo');
    }
  }

  private toggleLogoClass(elementId: string, theme: string, add: boolean): void {
    const el = document.getElementById(elementId);
    if (el) {
      if (add) {
        this.renderer.addClass(el, theme);
      } else {
        this.renderer.removeClass(el, theme);
      }
    }
  }

  private setLogo(elementId: string, src: string, alt: string): void {
    const el = document.getElementById(elementId) as HTMLImageElement | null;
    if (el) {
      el.setAttribute('src', src);
      el.setAttribute('alt', alt);
    }
  }
}
