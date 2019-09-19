import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormEditorInputComponent } from './components/form-editor-input/form-editor-input.component';
import { MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularD2FormsModule, FieldEditorRegistryService } from '@vividcode/angular-d2-forms';
import { FormEditorBooleanComponent } from './components/form-editor-boolean/form-editor-boolean.component';
import { FormEditorNumberComponent } from './components/form-editor-number/form-editor-number.component';
import { FormEditorMultilineComponent } from './components/form-editor-multiline/form-editor-multiline.component';
import { FormEditorSelectComponent } from './components/form-editor-select/form-editor-select.component';
import { FormEditorArrayComponent } from './components/form-editor-array/form-editor-array.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export function registerFormEditors(service: FieldEditorRegistryService) {
  const func = () => {
    service.registerGlobal('string', FormEditorInputComponent);
    service.registerGlobal('boolean', FormEditorBooleanComponent);
    service.registerGlobal('number', FormEditorNumberComponent);
    service.registerGlobal('multiline-string', FormEditorMultilineComponent);
    service.registerGlobal('select', FormEditorSelectComponent);
    service.registerGlobal('array', FormEditorArrayComponent);
  };
  return func;
}

@NgModule({
  declarations: [
    FormEditorInputComponent,
    FormEditorBooleanComponent,
    FormEditorNumberComponent,
    FormEditorMultilineComponent,
    FormEditorSelectComponent,
    FormEditorArrayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularD2FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
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
    FormEditorSelectComponent,
    FormEditorArrayComponent,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: registerFormEditors, deps: [FieldEditorRegistryService], multi: true},
  ]
})
export class AngularD2FormsMaterialModule {
}
