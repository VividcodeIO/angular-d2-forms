import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'ad2formsmaterial-form-editor-number',
  templateUrl: './form-editor-number.component.html',
  styleUrls: ['./form-editor-number.component.css']
})
export class FormEditorNumberComponent extends FormFieldEditorComponent<number> {

}
