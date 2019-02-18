import { Component, OnInit } from '@angular/core';
import { FormDescriptor, FormService, FormTransformation, ToggleEnabledStateFormTransformation } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormDescriptor<any>;
  initValue: any;
  transformations: FormTransformation<any>[];

  constructor(private formService: FormService) {

  }

  ngOnInit(): void {
    this.form = {
      id: 'simple',
      name: 'simple',
      fields: [{
        name: 'name',
        type: 'string',
      }, {
        name: 'vip',
        type: 'boolean',
      }, {
        name: 'alias',
        type: 'UserAlias',
      }, {
        name: 'type',
        type: 'select',
        data: ['a', 'b', 'c'],
      }, {
        name: 'address',
        fields: [{
          name: 'street',
          type: 'string',
        }],
      }, {
        name: 'description',
        type: 'multiline-string',
      }],
    };
    this.initValue = {
      name: 'alex',
      alias: [
        'a', 'b', 'c'
      ],
      vip: false,
      address: {
        street: 'test',
      },
    };
    this.transformations = [
      new ToggleEnabledStateFormTransformation<any>('vip', 'name'),
    ];
  }

  save() {
    this.formService.save('simple');
    console.log(this.formService.getValue('simple'));
  }
}
