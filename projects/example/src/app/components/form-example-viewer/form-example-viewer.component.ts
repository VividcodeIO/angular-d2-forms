import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormComponent, FormComponentConfig } from '@vividcode/angular-d2-forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-example-viewer',
  templateUrl: './form-example-viewer.component.html',
  styleUrls: ['./form-example-viewer.component.css']
})
export class FormExampleViewerComponent implements OnInit {
  @Input() name: string;
  @Input() formConfig: FormComponentConfig<any>;
  @ViewChild('form', {static: true}) _form: FormComponent<any>;
  _valueChanges: Observable<any>;

  constructor() { }

  ngOnInit() {
    this._valueChanges = this._form.valueChanges;
  }

}
