import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

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
        {
          type: 'enable-disable',
          opts: {
            sourceFieldPath: 'useFixedValue',
            targetFieldPaths: ['value1', 'value2'],
            enableWhenIsTrue: false,
          },
        },
        {
          type: 'setValue',
          opts: {
            sourceFieldPath: 'useFixedValue',
            sourceFieldValue: true,
            targetFieldValues: [
              {
                fieldPath: 'value1',
                value: 'Value 1 fixed',
              },
              {
                fieldPath: 'value2',
                value: 'Value 2 fixed',
              }
            ],
          }
        },
      ]
    };
  }

  ngOnInit() {
  }

}
