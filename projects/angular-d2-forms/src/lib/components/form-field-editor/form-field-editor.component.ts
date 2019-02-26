import { OnInit } from '@angular/core';
import { FormFieldConfig } from '../../form';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

export class FormFieldEditorComponent<T> implements OnInit {
  formFieldConfig: FormFieldConfig<T>;
  dependencyValues: Observable<any[]>;

  protected onInitialValueSet(value: T) {
  }

  protected getValue(): T {
    return this.formFieldConfig.formControl.value;
  }

  protected setValue(value: T, emitEvent = false) {
    this.formFieldConfig.formControl.setValue(value, {
      emitEvent,
    });
  }

  protected notifyValueChanged(value: T) {
    this.setValue(value, true);
  }

  protected save() {
  }

  ngOnInit(): void {
    this.onInitialValueSet(this.formFieldConfig.formControl.value);
  }

  protected setErrors(errors: ValidationErrors | null) {
    this.formFieldConfig.formControl.setErrors(errors);
  }

  get hasErrors(): boolean {
    return this.errors && this.errors.length > 0;
  }

  get errors(): string[] {
    return this.formFieldConfig.errors;
  }

}
