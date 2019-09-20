import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-enable-disable-controls',
  templateUrl: './enable-disable-controls.component.html',
  styleUrls: ['./enable-disable-controls.component.css']
})
export class EnableDisableControlsComponent implements OnInit {
  formConfig: FormComponentConfig<any>;

  constructor() {
    this.formConfig = {
      descriptor: {
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
          },
          {
            name: 'isVip',
            label: 'VIP?',
            type: 'boolean',
          },
          {
            name: 'discount',
            label: 'Discount',
            type: 'number',
          },
          {
            name: 'nested',
            label: 'Nested',
            fields: [
              {
                name: 'nested-1',
                label: 'Nested 1',
                type: 'string',
              },
              {
                name: 'nested-2',
                label: 'Nested 2',
                fields: [
                  {
                    name: 'nested-2-1',
                    label: 'Nested 2-1',
                    type: 'string',
                  }
                ],
              }
            ],
          }
        ],
      },
      transformations: [
        {
          type: 'enable-disable',
          opts: {
            sourceFieldPath: 'isVip',
            targetFieldPaths: ['discount'],
          },
        }
      ],
    };
  }

  ngOnInit() {
  }

}
