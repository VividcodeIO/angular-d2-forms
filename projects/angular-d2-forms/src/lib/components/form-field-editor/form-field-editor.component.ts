import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormFieldConfig } from '../../form';

@Component({
  selector: 'ad2forms-form-field-editor',
  templateUrl: './form-field-editor.component.html',
  styleUrls: ['./form-field-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldEditorComponent<T> implements OnInit {
  @Input() formFieldConfig: FormFieldConfig<T>;

  protected onInitialValueSet(value: T) {
  }

  protected getValue(): T {
    return this.formFieldConfig.formControl.value;
  }

  protected setValue(value: T) {
    this.formFieldConfig.formControl.setValue(value, {
      emitEvent: false,
    });
  }

  protected save() {
  }

  ngOnInit(): void {
    this.onInitialValueSet(this.formFieldConfig.formControl.value);
  }


}
