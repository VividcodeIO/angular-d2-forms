import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent, FormComponentConfig, requiredValidator } from '@vividcode/angular-d2-forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-use-form-values',
  templateUrl: './use-form-values.component.html',
  styleUrls: ['./use-form-values.component.css']
})
export class UseFormValuesComponent implements OnInit {
  _formConfig: FormComponentConfig<any>;
  @ViewChild('form') _form: FormComponent<any>;
  _formValue$: Observable<any>;

  constructor() {
    this._formConfig = {
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
            name: 'enabled',
            label: 'Enabled',
            type: 'boolean',
          },
          {
            name: 'count',
            label: 'Count',
            type: 'number',
            validators: [
              requiredValidator,
            ],
          }
        ],
      },
      value: {
        name: 'test',
        count: 300,
      },
    };
  }

  ngOnInit() {
    this._formValue$ = this._form.valueChanges;
  }

  save() {
    window.alert(JSON.stringify(this._form.value));
  }
}
