import { IAppConfig } from '../../../config/app-config.model';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class FeatureProviderService {
  STORAGE_FEATURE_KEY = 'FEATURES';
  private renderer: Renderer2;

  constructor(
    @Inject(LOCAL_STORAGE) public storage: StorageService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public initFeatures(features: IAppConfig): void {
    if (features.features.extra.showoptionspage) {
      if (!this.storage.get(this.STORAGE_FEATURE_KEY)) {
        this.storeFeatures(features);
      } else {
        features = this.getFeatures();
      }
    } else {
      this.deleteFeaturesFromLocalStorage();
    }
    this.renderer.addClass(document.body, features.stylesheet);
  }

  public storeFeatures(features: IAppConfig): void {
    this.storage.set(this.STORAGE_FEATURE_KEY, features);
  }

  public deleteFeaturesFromLocalStorage(): void {
    this.storage.remove(this.STORAGE_FEATURE_KEY);
  }

  public getFeatures(): IAppConfig {
    return this.storage.get(this.STORAGE_FEATURE_KEY);
  }

  setTheme(oldTheme: string, newTheme: string): void {
    this.renderer.removeClass(document.body, oldTheme);
    this.renderer.addClass(document.body, newTheme);
    this.renderer.removeClass(document.getElementById('header-logo'), oldTheme);
    this.renderer.addClass(document.getElementById('header-logo'), newTheme);
    this.renderer.removeClass(document.getElementById('footer-logo'), oldTheme);
    this.renderer.addClass(document.getElementById('footer-logo'), newTheme);
    if (newTheme === 'FDPGTheme') {
      document.getElementById('header-logo').setAttribute('src', 'assets/img/FDPG-Logo.svg');
      document.getElementById('header-logo').setAttribute('alt', 'FDPG Logo');
      document.getElementById('footer-logo').setAttribute('src', 'assets/img/Abide_MI_cropped.jpg');
      document.getElementById('footer-logo').setAttribute('alt', 'MII Logo');
    }
  }
}
