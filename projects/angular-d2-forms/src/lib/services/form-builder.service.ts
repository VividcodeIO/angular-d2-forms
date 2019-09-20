import { Injectable } from '@angular/core';
import { FormComponentConfig, FormConfig, FormField, FormFieldConfig, FormFieldsGroupConfig, SingleFormFieldConfig } from '../form';
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
    const {descriptor, value} = formComponentConfig;
    const formGroup = this.fb.group({});
    return new FormConfig(
      descriptor,
      descriptor.fields.map(field => this.buildField(field, formGroup, [], value, formGroup, descriptor.id)),
      formGroup,
      value
    );
  }

  buildField<T>(field: FormField<T>,
                formGroup: FormGroup,
                fieldPath: string[],
                groupValue: any,
                rootFormGroup: FormGroup,
                formId?: string): FormFieldConfig<T> {
    const fieldValue = get(groupValue, field.name, null);
    if (field.type) {
      formGroup.addControl(field.name, this.fb.control(fieldValue, this.getValidators(field)));
      const dependencyValues = (field.dependencies || []).reduce((obj, item) => {
        obj[item] = rootFormGroup.get(item).valueChanges;
        return obj;
      }, {});
      return new SingleFormFieldConfig(
        field,
        this.fieldEditorResolver.resolve(field, formId),
        formGroup,
        fieldPath.concat(field.name),
        dependencyValues,
        rootFormGroup,
        formId
      );
    } else {
      const group = this.fb.group({});
      formGroup.addControl(field.name, group);
      const groupFieldPath = fieldPath.concat(field.name);
      return new FormFieldsGroupConfig(
        field,
        field.fields.map(childField => this.buildField(childField, group, groupFieldPath, fieldValue, rootFormGroup, formId)),
        group,
        groupFieldPath,
        rootFormGroup,
        formId
      );
    }
  }

  replaceComponentType<T, C1, C2>(formFieldConfig: SingleFormFieldConfig<T, C1>, formId: string): SingleFormFieldConfig<T, C2> {
    const {formField} = formFieldConfig;
    const componentType = this.fieldEditorResolver.resolve(formField, formId);
    return formFieldConfig.withComponentType(componentType, formId);
  }

  buildGroupField<T>(formFieldsGroupConfig: FormFieldConfig<T>, formGroup: FormGroup, value?: T) {
    const {formField, fieldPath, rootFormGroup, formId} = formFieldsGroupConfig;
    return new FormFieldsGroupConfig(
      formField,
      formField.fields.map(childField => this.buildField(childField, formGroup, fieldPath, value, rootFormGroup, formId)),
      formGroup,
      fieldPath,
      rootFormGroup,
      formId
    );
  }

  buildArrayItemField<T>(formFieldConfig: FormFieldConfig<T>,
                         itemFormGroup: FormGroup,
                         fieldPath: string[],
                         groupValue: any) {
    const {formField, rootFormGroup, formId} = formFieldConfig;
    return new FormFieldsGroupConfig(
      formField,
      formField.fields.map(childField => this.buildField(childField, itemFormGroup, fieldPath, groupValue, rootFormGroup, formId)),
      itemFormGroup,
      fieldPath,
      rootFormGroup,
      formId
    );
  }

  private getValidators(field: FormField<any>) {
    return get(field, 'validators', []).map(v => v.validator);
  }
}
