import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormEditorInputComponent } from './components/form-editor-input/form-editor-input.component';
import { MatCheckboxModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldEditorRegistryService } from '@vividcode/angular-d2-forms';
import { FormEditorBooleanComponent } from './components/form-editor-boolean/form-editor-boolean.component';
import { FormEditorNumberComponent } from './components/form-editor-number/form-editor-number.component';
import { FormEditorMultilineComponent } from './components/form-editor-multiline/form-editor-multiline.component';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerGlobal('string', FormEditorInputComponent);
    service.registerGlobal('boolean', FormEditorBooleanComponent);
    service.registerGlobal('number', FormEditorNumberComponent);
    service.registerGlobal('multiline-string', FormEditorMultilineComponent);
  };
  return func;
}

@NgModule({
  declarations: [
    FormEditorInputComponent,
    FormEditorBooleanComponent,
    FormEditorNumberComponent,
    FormEditorMultilineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [
    FormEditorInputComponent,
    FormEditorBooleanComponent,
  ],
  entryComponents: [
    FormEditorInputComponent,
    FormEditorBooleanComponent,
    FormEditorNumberComponent,
    FormEditorMultilineComponent,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ]
})
export class AngularD2FormsMaterialModule {
}
