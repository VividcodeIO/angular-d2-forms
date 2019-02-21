import { ComponentType } from '@angular/cdk/portal';
import { AbstractControl, FormGroup } from '@angular/forms';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

export interface FormField<T> {
  name: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  data?: any;
  fields?: FormField<any>[];
}

export interface FormDescriptor<T> extends FormField<T> {
  id: string;
}

export function isFormFieldGroup(formField: FormField<any>) {
  return formField && formField.fields && formField.fields.length > 0;
}

export interface FormState<T> {
  descriptor: FormDescriptor<T>;
  value: T;
}

export abstract class FormTransformation<T> {
  abstract transform(formState: FormState<T>): FormState<T>;

  protected getFieldValue(formState: FormState<T>, fieldName: string) {
    return get(formState.value, fieldName);
  }

  protected findFieldByName(formDescriptor: FormDescriptor<T>, fieldName: string) {
    const fields = fieldName.split('.');
    let formField: FormField<any> = formDescriptor;
    let name;
    while (!!(name = fields.shift())) {
      if (formField.fields) {
        for (let i = 0; i < formField.fields.length; i++) {
          const field = formField.fields[i];
          if (isEqual(name, field.name)) {
            if (fields.length === 0) {
              return field;
            } else {
              formField = field;
              break;
            }
          }
        }
      }
    }
  }
}

export class ToggleEnabledStateFormTransformation<T> extends FormTransformation<T> {
  constructor(public readonly sourceFieldName: string, public readonly targetFieldName: string) {
    super();
  }

  transform(formState: FormState<T>): FormState<T> {
    const fieldValue = this.getFieldValue(formState, this.sourceFieldName);
    const field = this.findFieldByName(formState.descriptor, this.targetFieldName);
    if (field) {
      field.disabled = !fieldValue;
    }
    return formState;
  }
}

export abstract class FormFieldConfig<T> {
  protected constructor(public readonly formField: FormField<T>, public readonly formGroup: FormGroup) {
  }

  get fieldName(): string {
    return this.formField.name;
  }

  get fieldType(): string {
    return this.formField.type;
  }

  get isGroup(): boolean {
    return isFormFieldGroup(this.formField);
  }

  get formControl(): AbstractControl {
    return this.formGroup.get(this.fieldName);
  }

  get label(): string {
    return this.formField.label || this.formField.name;
  }

  get disabled(): boolean {
    return !!this.formField.disabled;
  }

  get data(): any {
    return this.formField.data;
  }
}

export class SingleFormFieldConfig<T, C> extends FormFieldConfig<T> {

  constructor(formField: FormField<T>, public readonly componentType: ComponentType<T>, formGroup: FormGroup) {
    super(formField, formGroup);
  }

}

export class FormFieldsGroupConfig<T> extends FormFieldConfig<T> {

  constructor(formField: FormField<T>, public fields: FormFieldConfig<any>[] = [], formGroup: FormGroup) {
    super(formField, formGroup);
  }

}

export class FormConfig<T> extends FormFieldsGroupConfig<T> {
  constructor(formDescriptor: FormDescriptor<T>, fields: FormFieldConfig<any>[] = [], formGroup: FormGroup, public readonly value?: T) {
    super(formDescriptor, fields, formGroup);
  }

  get id(): string {
    return (this.formField as FormDescriptor<any>).id;
  }
}

export type FormFieldMatcher = (type: string, name?: string, formId?: string) => boolean;

export interface FormComponentConfig<T> {
  descriptor: FormDescriptor<T>;
  initialValue?: T;
  transformations?: FormTransformation<T>[];
}
