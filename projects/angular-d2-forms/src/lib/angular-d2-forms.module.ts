import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { FieldBasicInputComponent } from './components/field-basic-input/field-basic-input.component';
import { SingleFormFieldComponent } from './components/single-form-field/single-form-field.component';
import { FormFieldsGroupComponent } from './components/form-fields-group/form-fields-group.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { FieldEditorRegistryService } from './services/field-editor-registry.service';
import { FormEditorArrayComponent } from './components/form-editor-array/form-editor-array.component';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerGlobal(null, FieldBasicInputComponent);
    service.registerGlobal('array', FormEditorArrayComponent);
  };
  return func;
}


@NgModule({
  declarations: [
    FormComponent,
    FieldBasicInputComponent,
    SingleFormFieldComponent,
    FormFieldsGroupComponent,
    FormEditorArrayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortalModule,
  ],
  entryComponents: [
    FieldBasicInputComponent,
    FormEditorArrayComponent,
  ],
  exports: [FormComponent],
  providers: [
    FieldEditorRegistryService,
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ]
})
export class AngularD2FormsModule {
}
