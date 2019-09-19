import { Component } from '@angular/core';
import { FormBuilderService, FormFieldArrayEditorComponent } from '@vividcode/angular-d2-forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ad2formsmaterial-form-editor-array',
  templateUrl: './form-editor-array.component.html',
  styleUrls: ['./form-editor-array.component.css']
})
export class FormEditorArrayComponent extends FormFieldArrayEditorComponent {

  constructor(public formBuilderService: FormBuilderService,
              public fb: FormBuilder) {
    super(formBuilderService, fb);
  }


}
