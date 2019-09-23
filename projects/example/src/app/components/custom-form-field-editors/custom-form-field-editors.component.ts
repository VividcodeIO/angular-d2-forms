import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-custom-form-field-editors',
  templateUrl: './custom-form-field-editors.component.html',
  styleUrls: ['./custom-form-field-editors.component.css']
})
export class CustomFormFieldEditorsComponent implements OnInit {
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
            name: 'timeUnit',
            label: 'Time unit',
            type: 'time-unit',
          }
        ],
      },
      value: {
        timeUnit: 30 * 1000,
      },
    };
  }

  ngOnInit() {

  }

}
