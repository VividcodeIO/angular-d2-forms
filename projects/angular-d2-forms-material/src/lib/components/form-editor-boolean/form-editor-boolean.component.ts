import { Component, OnInit } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'ad2formsmaterial-form-editor-boolean',
  templateUrl: './form-editor-boolean.component.html',
  styleUrls: ['./form-editor-boolean.component.css']
})
export class FormEditorBooleanComponent extends FormFieldEditorComponent<boolean> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
