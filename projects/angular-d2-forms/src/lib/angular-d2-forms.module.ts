import { NgModule } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { FieldBasicInputComponent } from './components/field-basic-input/field-basic-input.component';
import { SingleFormFieldComponent } from './components/single-form-field/single-form-field.component';
import { FormFieldsGroupComponent } from './components/form-fields-group/form-fields-group.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { FormFieldEditorComponent } from './components/form-field-editor/form-field-editor.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducer } from './store/state';
import { FormService } from './services/form.service';
import { FieldEditorRegistryService } from './services/field-editor-registry.service';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './store/effects';

@NgModule({
  declarations: [FormComponent, FieldBasicInputComponent, SingleFormFieldComponent, FormFieldsGroupComponent, FormFieldEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortalModule,
    StoreModule.forFeature(featureName, reducer),
    EffectsModule.forFeature([FormEffects]),
  ],
  entryComponents: [
    FieldBasicInputComponent,
  ],
  exports: [FormComponent],
  providers: [
    FormService,
    FieldEditorRegistryService,
  ]
})
export class AngularD2FormsModule {
}
