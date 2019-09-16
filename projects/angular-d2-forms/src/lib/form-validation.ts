import { ValidatorFn, Validators } from '@angular/forms';
import { FormField } from './form';

export function getFormDisplayName(formField: FormField<any>) {
  return formField.label || formField.name;
}

export type ErrorMessageBuilder = (field: FormField<any>, validationResult: any, value: any) => string;

export interface FormFieldValidator {
  key: string;
  message: string | ErrorMessageBuilder;
  validator: ValidatorFn;
}

export const requiredValidator: FormFieldValidator = {
  key: 'required',
  message: (field: FormField<any>) => `The value of ${getFormDisplayName(field)} is required.`,
  validator: Validators.required,
};

export function minLengthValidator(length: number): FormFieldValidator {
  return {
    key: 'minlength',
    message: (field, result) => `The minimum length of ${getFormDisplayName(field)} is ${result.requiredLength}.`,
    validator: Validators.minLength(length),
  };
}
