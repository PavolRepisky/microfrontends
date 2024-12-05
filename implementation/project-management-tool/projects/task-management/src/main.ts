import {
  bootstrapApplication,
  createApplication,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { EntryComponent } from './app/components/entry/entry.component';

const CUSTOM_ELEMENT_NAME = 'task-management';

async function initializeApp(): Promise<void> {
  try {
    if (!customElements.get(CUSTOM_ELEMENT_NAME)) {
      if (document.querySelector('task-root')) {
        await bootstrapApplication(AppComponent, appConfig);
      } else {
        const app = await createApplication(appConfig);

        const customElement = createCustomElement(EntryComponent, {
          injector: app.injector,
        });

        customElements.define(CUSTOM_ELEMENT_NAME, customElement);
      }
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

initializeApp();
