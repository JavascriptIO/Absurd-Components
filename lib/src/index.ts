import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioGolfComponent } from './components/radio';

export * from './components/radio';

let components = [
  RadioGolfComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class AbsurdComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AbsurdComponentsModule
    };
  }
}
