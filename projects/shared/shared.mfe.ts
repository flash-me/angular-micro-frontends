import {Component, DoBootstrap, Injectable, Injector, NgModule, Type} from '@angular/core';
import {createCustomElement} from '@angular/elements';

@Injectable({providedIn: 'platform'})
export class SharedMfe {
  private registeredMfes = new Map<string, Type<any>>()

  public registerMfe(name: string, type: Type<any>) {
    console.log(`Registering ${name}`)
    this.registeredMfes.set(name, type);

    console.log(`Total registered: ${this.registeredMfes.size}`)
  }
}

@Component({template: 'Shared Component', selector: 'mfe-shared'})
export class SharedComponent { }

@NgModule({
  declarations: [SharedComponent],
  exports: [SharedComponent]
})
export class SharedMfeModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    customElements.define(
      'mfe-shared',
      createCustomElement(SharedComponent, {injector: this.injector})
    )
  }
}
