import {SharedMfe, SharedMfeModule} from '@angular-mfe/shared';
import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'second-mfe',
  template: 'Second Angular Micro Frontend'
})
export class EntryComponent {
  constructor(private sharedMfe: SharedMfe) {
    sharedMfe.registerMfe('MFE-TWO', EntryComponent);
  }}

@NgModule({
  declarations: [EntryComponent],
  imports: [SharedMfeModule]
})
export class SecondMfeModule {
}

export const ngModule = SecondMfeModule;
