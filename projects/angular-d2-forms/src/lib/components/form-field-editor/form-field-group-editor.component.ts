import { FormBuilder } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormFieldEditorComponent } from './form-field-editor.component';
import { FormFieldsGroupConfig } from '../../form';

export abstract class FormFieldGroupEditorComponent<T> extends FormFieldEditorComponent<T> {
  formFieldsGroupConfig: FormFieldsGroupConfig<T>;

  protected constructor(public formBuilderService: FormBuilderService,
                        public fb: FormBuilder) {
    super();
  }

  protected onValue(value: T) {
    const {formGroup, fieldName} = this.formFieldConfig;
    const itemGroup = this.fb.group({});
    formGroup.setControl(fieldName, itemGroup);
    this.formFieldsGroupConfig = this.formBuilderService.buildGroupField(this.formFieldConfig, itemGroup, value);
  }
}
