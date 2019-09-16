import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'ad2formsmaterial-form-editor-multiline',
  templateUrl: './form-editor-multiline.component.html',
  styleUrls: ['./form-editor-multiline.component.css']
})
export class FormEditorMultilineComponent extends FormFieldEditorComponent<string> {
}
