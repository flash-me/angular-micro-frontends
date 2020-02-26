import {SharedMfe, SharedMfeModule} from '@angular-mfe/shared';
import {Component, DoBootstrap, Injector, NgModule, getPlatform} from '@angular/core';
import {BrowserModule, platformBrowser} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

@Component({
  template: `<p>First Angular Micro Frontend</p> <p><mfe-shared></mfe-shared></p>`
})
export class FirstMfe {
  constructor(private sharedMfe: SharedMfe) {
    sharedMfe.registerMfe('MFE-ONE', FirstMfe);
  }
}

@NgModule({
  declarations: [FirstMfe],
  imports: [BrowserModule, SharedMfeModule]
})
export class FirstMfeModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    customElements.define('mfe-one',
      createCustomElement(FirstMfe, {injector: this.injector}))
  }
}

// If there is already a platform, reuse it, otherwise create a new one
(getPlatform() || platformBrowser()).bootstrapModule(FirstMfeModule).catch(err => console.log(err));
