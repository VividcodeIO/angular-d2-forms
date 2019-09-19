import { NgModule } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { FieldBasicInputComponent } from './components/field-basic-input/field-basic-input.component';
import { SingleFormFieldComponent } from './components/single-form-field/single-form-field.component';
import { FormFieldsGroupComponent } from './components/form-fields-group/form-fields-group.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { FieldEditorRegistryService } from './services/field-editor-registry.service';

@NgModule({
  declarations: [
    FormComponent,
    FieldBasicInputComponent,
    SingleFormFieldComponent,
    FormFieldsGroupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortalModule,
  ],
  entryComponents: [
    FieldBasicInputComponent,
  ],
  exports: [
    FormComponent,
    FormFieldsGroupComponent,
  ],
  providers: [
    FieldEditorRegistryService,
  ]
})
export class AngularD2FormsModule {
}
