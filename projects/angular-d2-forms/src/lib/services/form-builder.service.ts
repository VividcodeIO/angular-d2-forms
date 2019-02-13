import { Injectable } from '@angular/core';
import {
  FormConfig,
  FormDescriptor,
  FormField,
  FormFieldConfig,
  FormFieldsGroup,
  FormFieldsGroupConfig,
  SingleFormField,
  SingleFormFieldConfig
} from '../form';
import { FieldEditorResolverService } from './field-editor-resolver.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fieldEditorResolver: FieldEditorResolverService,
              private fb: FormBuilder) {
  }

  build<T>(formDescriptor: FormDescriptor<T>): FormConfig<T> {
    const formGroup = this.fb.group({});
    return new FormConfig(formDescriptor, formDescriptor.fields.map(field => this.resolveField(field, formGroup)), formGroup);
  }

  private resolveField<T>(field: FormField<T>, formGroup: FormGroup): FormFieldConfig<T> {
    if (!field.isGroup()) {
      formGroup.addControl(field.name, this.fb.control({
        value: null,
        disabled: field.disabled,
      }));
      return new SingleFormFieldConfig(field as SingleFormField<T>,
        this.fieldEditorResolver.resolve(field as SingleFormField<T>), formGroup);
    } else if (field instanceof FormFieldsGroup) {
      const group = this.fb.group({});
      formGroup.addControl(field.name, group);
      return new FormFieldsGroupConfig(field, field.fields.map(childField => this.resolveField(childField, group)), group);
    }
  }
}
