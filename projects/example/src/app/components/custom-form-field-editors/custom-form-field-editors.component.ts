import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent, FormComponentConfig } from '@vividcode/angular-d2-forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-form-field-editors',
  templateUrl: './custom-form-field-editors.component.html',
  styleUrls: ['./custom-form-field-editors.component.css']
})
export class CustomFormFieldEditorsComponent implements OnInit, AfterViewInit {
  formConfig: FormComponentConfig<any>;
  @ViewChild('parentForm', {static: true}) _form: FormComponent<any>;
  _valueChanges: Observable<any>;

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

  ngAfterViewInit(): void {
    this._valueChanges = this._form.valueChanges;
  }

}
