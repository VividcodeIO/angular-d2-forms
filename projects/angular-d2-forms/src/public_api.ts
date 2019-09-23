/*
 * Public API Surface of angular-d2-forms
 */

export { AngularD2FormsModule } from './lib/angular-d2-forms.module';
export {
  FormComponentConfig, FormFieldsGroupConfig, FormDescriptor,
  FormField, FormState, DependencyValues, FormFieldConfig, FormFieldMatcher,
  SECTION_NAME, SECTION_TEMPLATE, SECTION_FIELDS, FORM_FIELD,
} from './lib/form';
export * from './lib/form-transformation';
export * from './lib/form-validation';
export { FieldEditorRegistryService } from './lib/services/field-editor-registry.service';
export { FormBuilderService } from './lib/services/form-builder.service';
export { FormFieldEditorComponent } from './lib/components/form-field-editor/form-field-editor.component';
export { FormFieldArrayEditorComponent } from './lib/components/form-field-editor/form-field-array-editor.component';
export { FormFieldGroupEditorComponent } from './lib/components/form-field-editor/form-field-group-editor.component';
export { FormComponent } from './lib/components/form/form.component';
