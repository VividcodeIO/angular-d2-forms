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
      new SingleFormField('name', 'text'),
      new FormFieldsGroup('address', [
        new SingleFormField('street', 'text'),
      ]),
    ], 'simple');
    this.initValue = {
      name: 'alex',
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
