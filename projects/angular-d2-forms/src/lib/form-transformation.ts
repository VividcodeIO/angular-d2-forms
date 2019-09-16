import { FormDescriptor, FormField, FormState } from './form';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import compact from 'lodash.compact';

export interface FormFieldChange {
  type: 'disable' | 'enable' | 'hide' | 'show' | 'setValue';
  value?: any;
}

export interface FormTransformationResult {
  fieldPath: string;
  change: FormFieldChange;
}

export abstract class FormTransformation<T> {
  abstract transform(formState: FormState<T>): FormTransformationResult[];

  protected getFieldValue(formState: FormState<T>, fieldPath: string) {
    return get(formState.value, fieldPath);
  }

  protected findFieldByName(formDescriptor: FormDescriptor<T>, fieldPath: string) {
    const path = fieldPath.split('.');
    let formField: (FormField<any> | FormDescriptor<T>) = formDescriptor;
    let name;
    while (!!(name = path.shift())) {
      if (formField.fields) {
        for (let i = 0; i < formField.fields.length; i++) {
          const field = formField.fields[i];
          if (isEqual(name, field.name)) {
            if (path.length === 0) {
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

export class EnableDisableFormTransformation<T> extends FormTransformation<T> {
  constructor(public readonly sourceFieldPath: string,
              public readonly targetFieldPaths: string[],
              public readonly enableWhenIsTrue: boolean = true) {
    super();
  }

  transform(formState: FormState<T>): FormTransformationResult[] {
    const fieldValue = this.getFieldValue(formState, this.sourceFieldPath);
    return compact(this.targetFieldPaths.map(fieldPath => {
      const field = this.findFieldByName(formState.descriptor, fieldPath);
      if (field) {
        return {
          fieldPath,
          change: {
            type: fieldValue ? (this.enableWhenIsTrue ? 'enable' : 'disable') : (this.enableWhenIsTrue ? 'disable' : 'enable'),
          },
        };
      }
    }));
  }
}

export class ShowHideFormTransformation<T> extends FormTransformation<T> {
  constructor(public readonly sourceFieldPath: string,
              public readonly sourceFieldValue: any,
              public readonly targetFieldPaths: string[],
              public readonly showWhenValueMatches: boolean = true) {
    super();
  }

  transform(formState: FormState<T>): FormTransformationResult[] {
    const fieldValue = this.getFieldValue(formState, this.sourceFieldPath);
    return compact(this.targetFieldPaths.map(fieldPath => {
      const field = this.findFieldByName(formState.descriptor, fieldPath);
      if (field) {
        return {
          fieldPath,
          change: {
            type: isEqual(fieldValue, this.sourceFieldValue)
              ? (this.showWhenValueMatches ? 'show' : 'hide')
              : (this.showWhenValueMatches ? 'hide' : 'show'),
          },
        };
      }
    }));
  }

}
