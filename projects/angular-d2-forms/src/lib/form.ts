import { ComponentType } from '@angular/cdk/portal';
import { AbstractControl, FormGroup } from '@angular/forms';
import find from 'lodash.find';
import includes from 'lodash.includes';
import concat from 'lodash.concat';
import isEqual from 'lodash.isequal';
import { Observable } from 'rxjs';
import { FormTransformationConfig } from './form-transformation';
import { FormFieldValidator, getFormDisplayName } from './form-validation';

export interface FormField<T> {
  name: string;
  label?: string;
  type?: string;
  validators?: FormFieldValidator[];
  data?: any;
  fields?: FormField<any>[];
  dependencies?: string[];
}

export interface FormDescriptor<T> {
  id?: string;
  fields?: FormField<any>[];
}

export function isFormFieldGroup(formField: FormField<any>) {
  return formField && formField.fields && formField.fields.length > 0;
}

export interface FormState<T> {
  descriptor: FormDescriptor<T>;
  value: T;
}

export interface DependencyValues {
  [fieldPath: string]: Observable<any>;
}

export abstract class FormFieldConfig<T> {
  protected constructor(public readonly formField: FormField<T>,
                        public readonly formGroup: FormGroup,
                        public readonly fieldPath: string[],
                        public readonly dependencyValues: DependencyValues) {
  }

  get fieldName(): string {
    return this.formField.name;
  }

  get fieldType(): string {
    return this.formField.type;
  }

  get fieldPathString(): string {
    return this.fieldPath.join('.');
  }

  get isGroup(): boolean {
    return isFormFieldGroup(this.formField);
  }

  get formControl(): AbstractControl {
    return this.formGroup.get(this.fieldName);
  }

  get label(): string {
    return getFormDisplayName(this.formField);
  }

  get data(): any {
    return this.formField.data;
  }

  get errors(): string[] {
    const errors = this.formControl.errors;
    if (!errors) {
      return [];
    }
    return Object.keys(errors).map(key => {
      const validator: FormFieldValidator = find(this.formField.validators, ['key', key]);
      if (typeof validator.message === 'string') {
        return validator.message;
      } else {
        return validator.message(this.formField, errors[key], this.formControl.value);
      }
    });
  }
}

export class SingleFormFieldConfig<T, C> extends FormFieldConfig<T> {

  constructor(formField: FormField<T>,
              public readonly componentType: ComponentType<T>,
              formGroup: FormGroup,
              fieldPath: string[],
              dependencyValues: DependencyValues = {}) {
    super(formField, formGroup, fieldPath, dependencyValues);
  }
}

export class FormFieldsGroupConfig<T> extends FormFieldConfig<T> {

  constructor(formField: FormField<T>,
              public fields: FormFieldConfig<any>[] = [],
              formGroup: FormGroup,
              fieldPath: string[]) {
    super(formField, formGroup, fieldPath, {});
  }

}

export class FormConfig<T> extends FormFieldsGroupConfig<T> {
  constructor(formDescriptor: FormDescriptor<T>, fields: FormFieldConfig<any>[] = [], formGroup: FormGroup, public readonly value?: T) {
    super({name: '_form', fields: formDescriptor.fields}, fields, formGroup, []);
  }

  get formDescriptor(): FormDescriptor<T> {
    return (this.formField as FormDescriptor<T>);
  }

  get valid(): boolean {
    return this.formGroup && this.formGroup.valid;
  }

  get invalid(): boolean {
    return this.formGroup && this.formGroup.invalid;
  }
}

export type FormFieldMatcher = (type: string, name?: string, formId?: string) => boolean;

export interface FormComponentConfig<T> {
  descriptor: FormDescriptor<T>;
  value?: T;
  transformations?: FormTransformationConfig[];
}

export const includesInFieldPaths = (fieldPaths: string[], fieldPath: string): boolean =>
  includes(fieldPaths, fieldPath);

export const addFieldPaths = (fieldPaths: string[], fieldPath: string): string[] => concat(fieldPaths, fieldPath);

export const removeFieldPaths = (fieldPaths: string[], fieldPath: string) => fieldPaths.filter(v => !isEqual(v, fieldPath));
