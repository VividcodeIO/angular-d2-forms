import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponentConfig, FormComponent, FormService, ToggleEnabledStateFormTransformation, FormDescriptor, RequiredValidator, minLengthValidator } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  config: FormComponentConfig<any>;
  @ViewChild('form') form: FormComponent;

  constructor(private formService: FormService) {

  }

  ngOnInit(): void {
    const form: FormDescriptor<any> = {
      id: 'simple',
      name: 'simple',
      fields: [{
        name: 'name',
        type: 'string',
        validators: [RequiredValidator, minLengthValidator(6)],
      }, {
        name: 'vip',
        type: 'boolean',
      }, {
        name: 'alias',
        type: 'UserAlias',
      }, {
        name: 'select1',
        type: 'cas-select',
        data: ['a', 'b', 'c'],
        validators: [RequiredValidator],
      }, {
        name: 'select2',
        type: 'cas-select',
        data: ['d', 'e', 'f'],
        depFields: ['select1'],
      }, {
        name: 'select3',
        type: 'cas-select',
        data: ['g', 'h', 'i'],
        depFields: ['select2'],
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
    const initValue = {
      name: 'alex',
      alias: [
        'a', 'b', 'c'
      ],
      vip: false,
      address: {
        street: 'test',
      },
    };
    const transformations = [
      new ToggleEnabledStateFormTransformation<any>('vip', 'name'),
    ];
    this.config = {
      descriptor: form,
      initialValue: initValue,
      transformations,
    };
  }


  save() {
    this.form.save();
    console.log(this.form.value);
  }
}
