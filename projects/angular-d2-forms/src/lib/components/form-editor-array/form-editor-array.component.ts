import { Component } from '@angular/core';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormFieldsGroupConfig } from '../../form';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ad2forms-form-editor-array',
  templateUrl: './form-editor-array.component.html',
  styleUrls: ['./form-editor-array.component.css']
})
export class FormEditorArrayComponent extends FormFieldEditorComponent<any[]> {
  items: FormFieldsGroupConfig<any>[] = [];
  hiddenFormFields: Observable<string[]> = of([]);
  formArray: FormArray;

  constructor(private _formBuilderService: FormBuilderService,
              private _fb: FormBuilder) {
    super();
  }


  protected onValue(value: any[]) {
    const {formGroup, fieldName} = this.formFieldConfig;
    const formArray = this._fb.array([]);
    formGroup.setControl(fieldName, formArray);
    const items = (value || []).map((v, index) => {
      return this._createItem(v, index);
    });
    items.forEach(item => formArray.push(item.formGroup));
    this.items = items;
    this.formArray = formArray;
  }

  addItem() {
    const item = this._createItem(null, this.items.length);
    this.items.push(item);
    this.formArray.push(item.formGroup);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.formArray.removeAt(index);
  }

  private _createItem(value: any, index: number) {
    const {formField, rootFormGroup, formId} = this.formFieldConfig;
    const itemFormGroup = this._fb.group({});
    const fieldPath = this.formFieldConfig.fieldPath.concat(`${index}`);
    return this._formBuilderService.buildArrayItemField(formField, itemFormGroup, fieldPath, value, rootFormGroup, formId);
  }
}
