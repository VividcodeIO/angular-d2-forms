import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-custom-form-group-editor',
  templateUrl: './custom-form-group-editor.component.html',
  styleUrls: ['./custom-form-group-editor.component.css']
})
export class CustomFormGroupEditorComponent implements OnInit {
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
            name: 'settings',
            label: 'Settings',
            type: 'app-settings',
            fields: [
              {
                name: 'setting1',
                label: 'Setting 1',
                type: 'string',
              },
              {
                name: 'setting2',
                label: 'Setting 2',
                type: 'boolean',
              },
              {
                name: 'setting3',
                label: 'Setting 3',
                type: 'number',
              },
            ],
          },
          {
            name: 'value',
            label: 'Value',
            type: 'select',
            data: ['1', '10', '100'],
          },
        ],
      },
      value: {
        name: 'ABC',
        settings: {
          'setting1': 'Hello world',
        },
      },
    };
  }

  ngOnInit() {
  }

}
