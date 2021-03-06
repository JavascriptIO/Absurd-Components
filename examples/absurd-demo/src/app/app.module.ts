import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AbsurdComponentsModule } from '../../lib'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AbsurdComponentsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
