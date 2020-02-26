import {SharedMfe} from '@angular-mfe/shared';
import {Component, DoBootstrap, Injector, NgModule, getPlatform} from '@angular/core';
import {BrowserModule, platformBrowser} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

@Component({template: 'Second Angular Micro Frontend'})
export class SecondMfe {
  constructor(private sharedMfe: SharedMfe) {
    sharedMfe.registerMfe('MFE-TWO', SecondMfe);
  }}

@NgModule({
  declarations: [SecondMfe],
  imports: [BrowserModule]
})
export class SecondMfeModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    customElements.define('mfe-two',
      createCustomElement(SecondMfe, {injector: this.injector}))
  }
}

(getPlatform() || platformBrowser()).bootstrapModule(SecondMfeModule).catch(err => console.log(err));
