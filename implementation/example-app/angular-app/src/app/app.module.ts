import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AngularElementComponent } from './angular-element/angular-element.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AngularElementComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef): void {
    const angularElement = createCustomElement(AngularElementComponent, {
      injector: this.injector,
    });
    customElements.define('angular-element', angularElement);
  }
}
