import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularD2FormsModule, FieldEditorRegistryService } from '@vividcode/angular-d2-forms';
import { AngularD2FormsMaterialModule } from '@vividcode/angular-d2-forms-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { EnableDisableControlsComponent } from './components/enable-disable-controls/enable-disable-controls.component';
import { ShowHideControlsComponent } from './components/show-hide-controls/show-hide-controls.component';
import { DependencyValuesComponent } from './components/dependency-values/dependency-values.component';
import { FormEditorStateSelectorComponent } from './components/form-editor-state-selector/form-editor-state-selector.component';
import { FormEditorCitySelectorComponent } from './components/form-editor-city-selector/form-editor-city-selector.component';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerGlobal('country-state', FormEditorStateSelectorComponent);
    service.registerGlobal('country-city', FormEditorCitySelectorComponent);
  };
  return func;
}

@NgModule({
  declarations: [
    AppComponent,
    EnableDisableControlsComponent,
    ShowHideControlsComponent,
    DependencyValuesComponent,
    FormEditorStateSelectorComponent,
    FormEditorCitySelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularD2FormsModule,
    AngularD2FormsMaterialModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
  ],
  entryComponents: [
    FormEditorStateSelectorComponent,
    FormEditorCitySelectorComponent,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
