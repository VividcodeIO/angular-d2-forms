import { FormFieldsGroupConfig } from '../../form';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldEditorComponent } from './form-field-editor.component';

export abstract class FormFieldArrayEditorComponent extends FormFieldEditorComponent<any[]> {
  items: FormFieldsGroupConfig<any>[] = [];
  formArray: FormArray;

  protected constructor(public formBuilderService: FormBuilderService,
                        public fb: FormBuilder) {
    super();
  }

  protected onValue(value: any[]) {
    const {formGroup, fieldName} = this.formFieldConfig;
    const formArray = this.fb.array([]);
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
    const itemFormGroup = this.fb.group({});
    const fieldPath = this.formFieldConfig.fieldPath.concat(`${index}`);
    return this.formBuilderService.buildArrayItemField(formField, itemFormGroup, fieldPath, value, rootFormGroup, formId);
  }
}
