import {SharedMfe, SharedMfeModule} from '@angular-mfe/shared';
import {Component, NgModule} from '@angular/core';

export const id = 'FirstMfeModule';

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
  id,
  declarations: [EntryComponent],
  imports: [SharedMfeModule]
})
export class FirstMfeModule {
}
