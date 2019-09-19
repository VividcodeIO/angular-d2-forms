import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-form-array-values',
  templateUrl: './form-array-values.component.html',
  styleUrls: ['./form-array-values.component.css']
})
export class FormArrayValuesComponent implements OnInit {
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
            name: 'addresses',
            label: 'Addresses',
            type: 'array',
            isArray: true,
            fields: [
              {
                name: 'name',
                label: 'Name',
                type: 'string',
              },
              {
                name: 'addressLine',
                label: 'Address line',
                type: 'string',
              }
            ],
          },
        ],
      },
      value: {
        name: 'User 1',
        addresses: [
          {
            name: 'Home',
            addressLine: 'Home address 1',
          }
        ],
      },
    };
  }

  ngOnInit() {
  }

}
