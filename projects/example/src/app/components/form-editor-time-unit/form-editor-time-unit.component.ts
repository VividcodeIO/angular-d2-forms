import { Component, ViewChild } from '@angular/core';
import { EnableDisableFormTransformation, FormComponent, FormComponentConfig, FormFieldEditorComponent } from '@vividcode/angular-d2-forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-editor-time-unit',
  templateUrl: './form-editor-time-unit.component.html',
  styleUrls: ['./form-editor-time-unit.component.css']
})
export class FormEditorTimeUnitComponent extends FormFieldEditorComponent<number> {
  _timeUnits = ['MILLISECONDS', 'SECONDS', 'MINUTES', 'HOURS'];
  _formConfig: FormComponentConfig<any>;
  @ViewChild('form') _form: FormComponent<any>;

  constructor() {
    super();
  }

  protected onValue(value: number) {
    const formValue = value ? {
      value: value / 1000,
      unit: 'SECONDS',
      isInfinite: false,
    } : {
      isInfinite: true,
    };
    this._formConfig = {
      descriptor: {
        fields: [
          {
            name: 'value',
            label: 'Value',
            type: 'number',
          },
          {
            name: 'unit',
            label: 'Unit',
            type: 'select',
            data: this._timeUnits,
          },
          {
            name: 'isInfinite',
            label: 'Infinite?',
            type: 'boolean',
          }
        ],
      },
      transformations: [
        new EnableDisableFormTransformation('isInfinite', ['value', 'unit'], false),
      ],
      value: formValue,
    };
  }

  protected get customValueChanges(): Observable<number> {
    return this._form.valueChanges.pipe(
      map(v => this._convertValue(v)),
    );
  }

  _convertValue(value) {
    const rawValue = this._form.getRawValue();
    return value.isInfinite ? null : rawValue.value * this._timeUnitToMilliseconds(rawValue.unit);
  }

  _timeUnitToMilliseconds(unit) {
    switch (unit) {
      case 'SECONDS':
        return 1000;
      case 'MINUTES':
        return 1000 * 60;
      case 'HOURS':
        return 1000 * 60 * 24;
      default:
        return 1;
    }
  }

}
