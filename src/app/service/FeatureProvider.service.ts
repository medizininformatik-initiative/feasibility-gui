import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, of } from 'rxjs';
import { IAppConfig } from '../config/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureProviderService {
  private readonly STORAGE_FEATURE_KEY = 'FEATURES';
  private renderer: Renderer2;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public initFeatures(features: IAppConfig): Observable<boolean> {
    if (features.features?.extra?.showoptionspage) {
      if (!this.storage.get(this.STORAGE_FEATURE_KEY)) {
        this.storeFeatures(features);
      } else {
        features = this.getFeatures() ?? features;
        return of(true);
      }
    } else {
      this.deleteFeaturesFromLocalStorage();
    }
    this.applyTheme(features.stylesheet);
  }

  public storeFeatures(features: IAppConfig): void {
    this.storage.set(this.STORAGE_FEATURE_KEY, features);
  }

  public deleteFeaturesFromLocalStorage(): void {
    this.storage.remove(this.STORAGE_FEATURE_KEY);
  }

  public getFeatures(): IAppConfig | null {
    return this.storage.get(this.STORAGE_FEATURE_KEY);
  }

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
