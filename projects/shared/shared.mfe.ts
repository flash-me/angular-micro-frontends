import {Component, Injectable, NgModule, Type} from '@angular/core';

@Injectable({providedIn: 'platform'})
export class SharedMfe {
  private registeredMfes = new Map<string, Type<any>>()

  public registerMfe(name: string, type: Type<any>) {
    console.log(`Registering ${name}`)
    this.registeredMfes.set(name, type);

    console.log(`Total registered: ${this.registeredMfes.size}`)
  }
}

@Component({template: 'Shared Component', selector: 'shared-component'})
export class SharedComponent { }

@NgModule({
  declarations: [SharedComponent],
  exports: [SharedComponent]
})
export class SharedMfeModule { }
