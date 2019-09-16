import { OnInit } from '@angular/core';
import { DependencyValues, FormFieldConfig } from '../../form';
import { ValidationErrors } from '@angular/forms';

export abstract class FormFieldEditorComponent<T> implements OnInit {
  formFieldConfig: FormFieldConfig<T>;

  protected onValue(value: T) {
  }

  protected getValue(): T {
    return this.formFieldConfig.formControl.value;
  }

  ngOnInit(): void {
    this.onValue(this.formFieldConfig.formControl.value);
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

  get dependencyValues(): DependencyValues {
    return this.formFieldConfig.dependencyValues;
  }
}
