import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-form-editor-user-alias',
  templateUrl: './form-editor-user-alias.component.html',
  styleUrls: ['./form-editor-user-alias.component.css']
})
export class FormEditorUserAliasComponent extends FormFieldEditorComponent<any> {
  alias: string[];

  constructor() {
    super();
  }


  protected onInitialValueSet(value: any): void {
    this.alias = value;
  }


  protected save(): void {
    this.setValue(['d', 'e', 'f']);
  }
}
