import { Injectable } from '@angular/core';
import { FormField } from '../form';
import { FieldEditorRegistryService } from './field-editor-registry.service';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class FieldEditorResolverService {

  constructor(private fieldEditorRegistryService: FieldEditorRegistryService) {
  }

  resolve(formField: FormField<any>, formId?: string): ComponentType<any> {
    return this.fieldEditorRegistryService.find(formField, formId);
  }
}
