import { Component, OnInit } from '@angular/core';
import { EnableDisableFormTransformation, FormComponentConfig, SetValueFormTransformation } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-set-control-values',
  templateUrl: './set-control-values.component.html',
  styleUrls: ['./set-control-values.component.css']
})
export class SetControlValuesComponent implements OnInit {
  formConfig: FormComponentConfig<any>;

  constructor() {
    this.formConfig = {
      descriptor: {
        fields: [
          {
            name: 'useFixedValue',
            label: 'Use fixed value',
            type: 'boolean',
          },
          {
            name: 'value1',
            label: 'Value 1',
            type: 'string',
          },
          {
            name: 'value2',
            label: 'Value 2',
            type: 'string',
          }
        ],
      },
      transformations: [
        new EnableDisableFormTransformation('useFixedValue', ['value1', 'value2'], false),
        new SetValueFormTransformation('useFixedValue', true, [
          {
            fieldPath: 'value1',
            value: 'Value 1 fixed',
          },
          {
            fieldPath: 'value2',
            value: 'Value 2 fixed',
          }
        ]),
      ]
    };
  }

  ngOnInit() {
  }

}
