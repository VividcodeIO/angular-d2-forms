import { Component, OnInit } from '@angular/core';
import { FormComponentConfig } from '@vividcode/angular-d2-forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-config',
  templateUrl: './dynamic-form-config.component.html',
  styleUrls: ['./dynamic-form-config.component.css']
})
export class DynamicFormConfigComponent implements OnInit {
  formConfig$ = new BehaviorSubject<FormComponentConfig<any>>(null);
  formConfig1: FormComponentConfig<any>;
  formConfig2: FormComponentConfig<any>;

  constructor() {
    this.formConfig1 = {
      descriptor: {
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'string'
          },
        ],
      },
      value: {
        name: 'Value 1',
      },
    };
    this.formConfig2 = {
      descriptor: {
        fields: [
          {
            name: 'enabled',
            label: 'Enabled',
            type: 'boolean'
          },
        ],
      },
      value: {
        enabled: true,
      },
    };
  }

  ngOnInit() {
  }

  useForm1() {
    this.formConfig$.next(this.formConfig1);
  }

  useForm2() {
    this.formConfig$.next(this.formConfig2);
  }
}
