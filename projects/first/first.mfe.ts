import {SharedMfe, SharedMfeModule} from '@angular-mfe/shared';
import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'first-mfe',
  template: `
    <p>First Angular Micro Frontend</p> 
    <p>
      <shared-component></shared-component>
    </p>
  `
})
export class EntryComponent {
  constructor(private sharedMfe: SharedMfe) {
    sharedMfe.registerMfe('MFE-ONE', EntryComponent);
  }
}

@NgModule({
  declarations: [EntryComponent],
  imports: [SharedMfeModule]
})
export class FirstMfeModule {
}

export const ngModule = FirstMfeModule;
