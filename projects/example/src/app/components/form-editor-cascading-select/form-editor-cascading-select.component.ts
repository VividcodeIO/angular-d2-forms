import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-form-editor-cascading-select',
  templateUrl: './form-editor-cascading-select.component.html',
  styleUrls: ['./form-editor-cascading-select.component.css']
})
export class FormEditorCascadingSelectComponent extends FormFieldEditorComponent<string> {

}
