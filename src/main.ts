import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => {
    setTimeout(() => {
      const globalError = document.getElementById('global-error');
      const errorMessage = document.getElementById('global-error-message');
      if (globalError && errorMessage) {
        globalError.style.display = 'flex';
        errorMessage.innerText = err?.message || String(err);
      }
    }, 300);
  });
