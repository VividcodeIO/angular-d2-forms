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
import { FormValidationComponent } from './components/form-validation/form-validation.component';
import { MatCardModule } from '@angular/material/card';
import { UseFormValuesComponent } from './components/use-form-values/use-form-values.component';
import { MatButtonModule } from '@angular/material/button';
import { SetControlValuesComponent } from './components/set-control-values/set-control-values.component';
import { FormEditorTimeUnitComponent } from './components/form-editor-time-unit/form-editor-time-unit.component';
import { CustomFormFieldEditorsComponent } from './components/custom-form-field-editors/custom-form-field-editors.component';
import { ExampleHomeComponent } from './components/example-home/example-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormExampleViewerComponent } from './components/form-example-viewer/form-example-viewer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormArrayValuesComponent } from './components/form-array-values/form-array-values.component';
import { CustomFormGroupEditorComponent } from './components/custom-form-group-editor/custom-form-group-editor.component';
import { FormEditorAppSettingsComponent } from './components/form-editor-app-settings/form-editor-app-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppSettingsDialogComponent } from './components/app-settings-dialog/app-settings-dialog.component';
import { DynamicFormConfigComponent } from './components/dynamic-form-config/dynamic-form-config.component';
import { FormSectionsComponent } from './components/form-sections/form-sections.component';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerGlobal('country-state', FormEditorStateSelectorComponent);
    service.registerGlobal('country-city', FormEditorCitySelectorComponent);
    service.registerGlobal('time-unit', FormEditorTimeUnitComponent);
    service.registerGlobal('app-settings', FormEditorAppSettingsComponent);
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
    FormValidationComponent,
    UseFormValuesComponent,
    SetControlValuesComponent,
    FormEditorTimeUnitComponent,
    CustomFormFieldEditorsComponent,
    ExampleHomeComponent,
    FormExampleViewerComponent,
    FormArrayValuesComponent,
    CustomFormGroupEditorComponent,
    FormEditorAppSettingsComponent,
    AppSettingsDialogComponent,
    DynamicFormConfigComponent,
    FormSectionsComponent,
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
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatDialogModule,
  ],
  entryComponents: [
    FormEditorStateSelectorComponent,
    FormEditorCitySelectorComponent,
    FormEditorTimeUnitComponent,
    FormEditorAppSettingsComponent,
    AppSettingsDialogComponent,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
