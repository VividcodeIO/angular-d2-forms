import { Component, Input, OnInit } from '@angular/core';
import { FormFieldConfig, FormFieldsGroupConfig, SingleFormFieldConfig } from '../../form';

@Component({
  selector: 'ad2forms-form-fields-group',
  templateUrl: './form-fields-group.component.html',
  styleUrls: ['./form-fields-group.component.css']
})
export class FormFieldsGroupComponent implements OnInit {
  @Input() formId: string;
  @Input() config: FormFieldsGroupConfig<any>;

  constructor() {

  }

  isSingleFormField(field: FormFieldConfig<any>) {
    return !field.isGroup;
  }

  ngOnInit() {
  }

}
