import { Injectable } from '@angular/core';
import { FormField } from '../form';
import { FieldBasicInputComponent } from '../components/field-basic-input/field-basic-input.component';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class FieldEditorRegistryService {
  private _editors: Map<string, ComponentType<any>> = new Map();

  constructor() {
    this.registerGlobal(null, FieldBasicInputComponent);
  }

  registerGlobal(type: string, editor: ComponentType<any>) {
    this._editors.set(this.generateKey(type), editor);
  }

  registerField(fieldName: string, type: string, editor: ComponentType<any>) {
    this._editors.set(this.generateKey(type, fieldName), editor);
  }

  registerForm(formId: string, fieldName: string, type: string, editor: ComponentType<any>) {
    this._editors.set(this.generateKey(type, fieldName, formId), editor);
  }

  private generateKey(type: string, fieldName: string = null, formId: string = null) {
    return `${formId || ''}-${fieldName || ''}-${type || ''}`;
  }

  find(formField: FormField<any>, formId?: string): ComponentType<any> {
    return this._editors.get(this.generateKey(formField.type, formField.name, formId)) ||
      this._editors.get(this.generateKey(formField.type, formField.name, null)) ||
      this._editors.get(this.generateKey(formField.type, null, null)) ||
      this._editors.get(this.generateKey(null, null, null));
  }
}
