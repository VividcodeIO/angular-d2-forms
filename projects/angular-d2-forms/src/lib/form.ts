import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import uuid from 'uuid/v1';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export abstract class FormField<T> {

  protected constructor(readonly name: string, public readonly label?: string, public readonly defaultValue?: T) {
  }

  abstract isGroup(): boolean;
}

export class SingleFormField<T> extends FormField<T> {

  constructor(name: string, public type: string, label?: string) {
    super(name, label);
  }

  isGroup(): boolean {
    return false;
  }
}

export class FormFieldsGroup<T> extends FormField<T> {
  constructor(name: string, public fields: FormField<any>[] = [], label?: string) {
    super(name, label);
  }

  isGroup(): boolean {
    return true;
  }
}

export class FormDescriptor<T> extends FormFieldsGroup<T> {

  constructor(name: string, fields: FormField<any>[] = [], public readonly id: string = uuid()) {
    super(name, fields);
  }
}

export abstract class FormFieldConfig<T> {
  protected constructor(public readonly formField: FormField<T>, public readonly formGroup: FormGroup) {
  }

  get fieldName(): string {
    return this.formField.name;
  }

  get isGroup(): boolean {
    return this.formField.isGroup();
  }

  get formControl(): AbstractControl {
    return this.formGroup.get(this.fieldName);
  }
}

export class SingleFormFieldConfig<T, C> extends FormFieldConfig<T> {

  constructor(formField: SingleFormField<T>, public readonly componentType: ComponentType<T>, formGroup: FormGroup) {
    super(formField, formGroup);
  }

}

export class FormFieldsGroupConfig<T> extends FormFieldConfig<T> {

  constructor(fieldsGroup: FormFieldsGroup<T>, public fields: FormFieldConfig<any>[] = [], formGroup: FormGroup) {
    super(fieldsGroup, formGroup);
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

