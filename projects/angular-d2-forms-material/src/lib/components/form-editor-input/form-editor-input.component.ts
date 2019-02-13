import { Component, OnInit } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'ad2formsmaterial-form-editor-input',
  templateUrl: './form-editor-input.component.html',
  styleUrls: ['./form-editor-input.component.css']
})
export class FormEditorInputComponent extends FormFieldEditorComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
