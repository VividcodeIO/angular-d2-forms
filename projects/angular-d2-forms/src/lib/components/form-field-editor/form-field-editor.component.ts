import { OnDestroy, OnInit } from '@angular/core';
import { DependencyValues, FormFieldConfig } from '../../form';
import { ValidationErrors } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

export abstract class FormFieldEditorComponent<T> implements OnInit, OnDestroy {
  formFieldConfig: FormFieldConfig<T>;
  _customValueChangeSubscription: Subscription;

  ngOnInit(): void {
    this.onValue(this.formFieldConfig.formControl.value);
    if (this.customValueChanges) {
      this._customValueChangeSubscription = this.customValueChanges.subscribe(value => this.notifyValueChanged(value));
    }
  }

  ngOnDestroy(): void {
    if (this._customValueChangeSubscription) {
      this._customValueChangeSubscription.unsubscribe();
    }
  }

  protected onValue(value: T) {
  }

  protected get value(): T {
    return this.formFieldConfig.formControl.value;
  }

  protected notifyValueChanged(value: T) {
    this.formFieldConfig.formControl.setValue(value);
  }

  protected get customValueChanges(): Observable<T> {
    return null;
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
