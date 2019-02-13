import { Component, OnInit } from '@angular/core';
import { FormDescriptor, SingleFormField, FormFieldsGroup, FormService } from '@vividcode/angular-d2-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormDescriptor<any>;
  initValue: any;

  constructor(private formService: FormService) {

  }

  ngOnInit(): void {
    this.form = new FormDescriptor('simple', [
      new SingleFormField('name', 'string'),
      new SingleFormField('vip', 'boolean'),
      new SingleFormField('alias', 'UserAlias'),
      new FormFieldsGroup('address', [
        new SingleFormField('street', 'string'),
      ]),
    ], 'simple');
    this.initValue = {
      name: 'alex',
      alias: [
        'a', 'b', 'c'
      ],
      vip: true,
      address: {
        street: 'test',
      },
    };
  }

  save() {
    this.formService.save('simple');
    console.log(this.formService.getValue('simple'));
  }
}
