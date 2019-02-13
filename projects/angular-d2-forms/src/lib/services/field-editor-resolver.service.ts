import { Injectable } from '@angular/core';
import { SingleFormField } from '../form';
import { FieldEditorRegistryService } from './field-editor-registry.service';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class FieldEditorResolverService {

  constructor(private fieldEditorRegistryService: FieldEditorRegistryService) {
  }

  resolve(formField: SingleFormField<any>): ComponentType<any> {
    return this.fieldEditorRegistryService.find(formField);
  }
}
