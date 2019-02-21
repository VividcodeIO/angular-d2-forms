import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';

@Component({
  selector: 'ad2forms-field-basic-input',
  templateUrl: './field-basic-input.component.html',
  styleUrls: ['./field-basic-input.component.css']
})
export class FieldBasicInputComponent extends FormFieldEditorComponent<string> {
}
