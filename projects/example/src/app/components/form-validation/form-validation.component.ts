import { Component, OnInit } from '@angular/core';
import { emailValidator, FormComponentConfig, minLengthValidator, requiredValidator } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  _basicFormConfig: FormComponentConfig<any>;

  constructor() {
    this._basicFormConfig = {
      descriptor: {
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string',
            validators: [
              requiredValidator,
            ],
          },
          {
            name: 'username',
            label: 'Username',
            type: 'string',
            validators: [
              requiredValidator, minLengthValidator(8),
            ],
          },
          {
            name: 'email',
            label: 'Email',
            type: 'string',
            validators: [
              requiredValidator, emailValidator,
            ],
          },
        ],
      },
    };
  }

  ngOnInit() {
  }

}
