import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularD2FormsModule } from '@vividcode/angular-d2-forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularD2FormsMaterialModule } from '@vividcode/angular-d2-forms-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularD2FormsModule,
    AngularD2FormsMaterialModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'NgRx DevTools',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
