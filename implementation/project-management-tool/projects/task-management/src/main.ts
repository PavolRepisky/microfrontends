import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { EntryComponent } from './app/components/entry/entry.component';
import { environment } from './environments/environment';

async function initializeApp(): Promise<void> {
  try {
    // Check if the custom element is already defined
    if (customElements.get(environment.customElementName)) return;

    // Use the environment variable to determine the initialization mode
    if (environment.embedded) {
      // Initialize as Custom Element
      const app = await createApplication(appConfig);
      const customElement = createCustomElement(EntryComponent, {
        injector: app.injector,
      });
      customElements.define(environment.customElementName, customElement);
    } else {
      // Initialize as normal Angular application
      await bootstrapApplication(AppComponent, appConfig);
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

initializeApp();
