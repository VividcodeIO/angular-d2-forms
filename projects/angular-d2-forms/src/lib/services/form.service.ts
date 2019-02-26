import { Injectable } from '@angular/core';
import { FieldEditorComponentService } from './field-editor-component.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private _forms: Map<string, FormGroup> = new Map();

  constructor(private fieldEditorComponentService: FieldEditorComponentService) {
  }

  addForm(formId: string, form: FormGroup) {
    this._forms.set(formId, form);
  }

  removeForm(formId) {
    this._forms.delete(formId);
    this.fieldEditorComponentService.removeForm(formId);
  }

  save(formId: string) {
    this.fieldEditorComponentService.save(formId);
  }

  getValue(formId: string) {
    return this._forms.has(formId) ? this._forms.get(formId).value : null;
  }
}
