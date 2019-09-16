import { Injectable } from '@angular/core';
import {
  FormComponentConfig,
  FormConfig,
  FormField,
  FormFieldConfig,
  FormFieldsGroupConfig,
  isFormFieldGroup,
  SingleFormFieldConfig
} from '../form';
import { FieldEditorResolverService } from './field-editor-resolver.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import get from 'lodash.get';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fieldEditorResolver: FieldEditorResolverService,
              private fb: FormBuilder) {
  }

  build<T>(formComponentConfig: FormComponentConfig<T>): FormConfig<T> {
    const { descriptor, value } = formComponentConfig;
    const formGroup = this.fb.group({});
    return new FormConfig(
      descriptor,
      descriptor.fields.map(field => this._resolveField(field, formGroup, [], value, formGroup)),
      formGroup,
      value
    );
  }

  private _resolveField<T>(field: FormField<T>,
                          formGroup: FormGroup,
                          fieldPath: string[],
                          groupValue: any,
                          rootFormGroup: FormGroup): FormFieldConfig<T> {
    const fieldValue = get(groupValue, field.name, null);
    if (!isFormFieldGroup(field)) {
      formGroup.addControl(field.name, this.fb.control({
        value: fieldValue,
        disabled: field.disabled,
      }, this.getValidators(field)));
      const dependencyValues = (field.dependencies || []).reduce((obj, item) => {
        obj[item] = rootFormGroup.get(item).valueChanges;
        return obj;
      }, {});
      return new SingleFormFieldConfig(
        field,
        this.fieldEditorResolver.resolve(field),
        formGroup,
        fieldPath.concat(field.name),
        dependencyValues
      );
    } else {
      const group = this.fb.group({});
      formGroup.addControl(field.name, group);
      const groupFieldPath = fieldPath.concat(field.name);
      return new FormFieldsGroupConfig(
        field,
        field.fields.map(childField => this._resolveField(childField, group, groupFieldPath, fieldValue, rootFormGroup)),
        group,
        groupFieldPath);
    }
  }

  private getValidators(field: FormField<any>) {
    return get(field, 'validators', []).map(v => v.validator);
  }
}
