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

  protected setValue(value: T, emitEvent = false) {
    this.formFieldConfig.formControl.setValue(value, {
      emitEvent,
    });
  }

  protected notifyValueChanged(value: T) {
    this.setValue(value, true);
  }

  protected save() {
  }

  ngOnInit(): void {
    this.onInitialValueSet(this.formFieldConfig.formControl.value);
  }

  get hasErrors(): boolean {
    return this.errors && this.errors.length > 0;
  }

  get errors(): string[] {
    return this.formFieldConfig.errors;
  }

}
